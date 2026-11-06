---
title: Player
description: The research base for player, the tapt tool that hosts video sales letters and tracks how far each prospect gets through them.
---

## Intention

This document is the research base for player, the tapt tool that hosts video sales letters and tracks how far each prospect gets through them. It explains how the three main hosts that direct response marketers actually use (Wistia, Vturb, Vidalytics) collect viewing data, what they store about a viewer, how they define their metrics, how they tie a sale back to a video, and which VSL-specific player behaviors they ship. It closes with what those findings mean for what we build.

Everything here comes from the vendors' own help centers, developer docs, and API references. Where the docs were silent, the vendors' public player scripts were read directly; those points are called out as coming from the code. Marketing SOPs and copywriting are deliberately left out. This is about the tools themselves.

## The shared model

Strip the branding and all three are the same machine. A player script runs in the prospect's browser, assigns them an anonymous id stored in localStorage, and posts events to a collector as the video plays. Progress is sampled about every five seconds. The retention curve is just a count of how many viewers were still present at each five-second bucket. Play rate is plays divided by loads. Engagement is total watched time divided by plays times video length.

Where they differ is everything built on top of that: whether the viewer ever becomes a person, whether rewatching is visible or collapsed, and how a purchase gets stitched back to the video that produced it. Those three decisions define each product.

## Wistia

Wistia is an identity product. Its whole analytics model is built around turning an anonymous viewer into a known person and then showing you that person's history.

The viewer gets a visitor key that persists across sessions and an event key per viewing session. The moment they submit a Wistia form, pass an email through the embed, or arrive on a link with their email merged into the URL, every prior anonymous session in that browser is retroactively attached to them. The audience view then shows one row per person with a color-coded heatmap per session: white for never watched, green once, yellow twice, orange through red for repeated rewatching. You can click into any session and see their browser, IP, and the page the video was embedded on.

Storage is per second. The player keeps a vector of how many times each second was watched, which is why Wistia is the only one of the three that shows rewatches as a separate overlay on the engagement graph. The blue area is who was present, the orange block on top is how many times that section was replayed. Seeks are detected when playback jumps more than a second and a half.

Metric definitions are the cleanest of the three. A play is recorded when the first frame renders, not on hover or load. Play rate is people who played over unique page loads, and replays inside one visit count once. Engagement is the average share of the video watched. Play rate can exceed one hundred percent on autoplay pages, and they say so.

Sale attribution is handled through identity and CRM sync rather than through the player. Watch milestones at 25, 50, 75, and 100 percent fire into HubSpot, Marketo, and Pardot as timeline events on the contact, and out through webhooks and Zapier. Meta and GA4 get play, quarter-milestones at 25, 50, 75, and 95, and seconds-played in sixty-second increments. There is no checkout integration and no revenue number inside Wistia; the sale lives in the CRM.

VSL-relevant controls exist but are not the focus. You can hide the playbar, turn off speed and quality controls, silent-autoplay, and enable resume, though resume only auto-enables for videos over five minutes and never alongside autoplay. There is no fake progress bar, no pitch-time concept, and no exit thumbnail. Chapters, a single CTA, annotation links, an email gate with optional skip, and A/B tests comparing play rate and engagement round it out.

The Stats API exposes all of this per media, per event, and per visitor, with events kept for two years. Privacy is mature: a do-not-track flag that reports nothing, a privacy mode that anonymizes IPs and makes every view look like a new visitor, and a consent API.

What Wistia is not: it is not built for anonymous cold traffic being pushed to a checkout. It assumes a B2B world where the viewer eventually fills out a form.

## Vturb

Vturb is a conversion machine for anonymous traffic. It never tries to learn who the viewer is. It cares about one thing: did this session get past the pitch and did it buy.

The viewer is a device id that lives for a year and a session id that lives for seven days. There is no email, no name, no lead record anywhere in the player. The product knows country, device, browser, OS, the page URL the player was on, and the traffic parameters that brought them there, and that is the whole profile.

Progress is stored as maximum watched time per session and per device, bucketed to five seconds. That is an important design choice: the retention curve is strictly monotonic because it is unique time reached, not time spent. Rewatching is invisible. Pitch time is a first-class field on every player, and every metric splits into over-pitch and under-pitch. The retention tab draws the audience curve, marks the pitch, lets you place up to seven custom points like "lead retention at three minutes," and overlays a cumulative conversion line on the same timeline so you can see where in the video the buyers clicked.

Metric definitions reflect the audience. Views are page loads, not plays. Play rate is unique plays over unique views. Engagement is total watched time over plays times duration. Conversion rate is conversions over unique plays. Revenue per view exists only inside A/B tests. Conversions count only the main product, but revenue includes bumps and upsells. They tell you not to read the data until you have two hundred unique views.

Sale attribution is the cleverest part. Every outbound link on the page gets rewritten with a key that encodes the session id, the player id, and the number of seconds watched at the moment of the click. That key rides through the checkout and comes back on a webhook from the payment platform. Hotmart, Kiwify, Cartpanda, Monetizze, Eduzz, Clickbank, Digistore24, and about two dozen others are supported natively; Stripe is not on the list, and Zapier or Make fill the gap. The result is that Vturb knows, per sale, exactly how far into the video the buyer was when they clicked.

The feature set is forced consumption, and the code confirms how it works. Smart Autoplay starts muted with a click-to-unmute overlay and probes the browser's autoplay policy with a tiny test file first. The fake progress bar, which they call Smart Progress, is a cosmetic bar driven by an exponential curve that runs fast at the start and slows down; the code clamps the exponent between two and three and it has no tracking of its own. The action button can be set to appear at pitch time, reveal hidden page elements by class or id, auto-scroll to them, and stay revealed for returning visitors. Resume stores position for thirty days. Pause thumbnails swap in a retention image before the pitch and a recovery image with a button after it. Turbo silently tests playback speeds from normal to one and a half times and picks the one that converts best. Automatic tests on autoplay, headlines, and speed require conversion tracking to be live.

Pixels fire View events every five percent plus a named Pitch event, browser-side only; there is no server-side conversions API. The Analytics API is rate-limited by plan and does not document data retention. The privacy policy could not be read and there is no consent mode at all.

What Vturb is not: it is not a tool for knowing your prospect. It is a tool for squeezing a funnel. Everything about it assumes the viewer is a stranger who will either buy today or never.

## Vidalytics

Vidalytics sits between the other two and borrows from both. It is anonymous by default like Vturb, but bolts identity on through the URL, and it is the only one with an honest bounce metric.

The viewer id lives in localStorage with no expiry, paired with a session id that lasts the tab. A returning viewer is the same id on the same video on the same domain. Identity comes in one way: you pass the email or a user id as a URL parameter and configure a tag to read it. Tags fire once per viewer at a timestamp, on a CTA, or on an interactive choice, and they push to ActiveCampaign, HubSpot, and Zapier. There is no identify method and no retroactive attachment of earlier sessions.

Progress is a heartbeat every five seconds while playing, stamped with the video time, plus edge events for play, pause, seek, unmute, restart, and resume. That gives three graphs: an audience curve, a conversion curve on the same axis, and separate skip and rewind heatmaps. Smart Pause stops the heartbeat when the tab is hidden, so time away from the tab does not count as watching.

Metric definitions are broader and a little looser than Wistia's. Plays include autoplays, partial watches, and repeats. Impressions are player loads. Play rate is defined two different ways in two different help articles. Engagement is total watched time over total watches times length. Unmute rate counts viewers who turned sound on including overlay clicks. Bounce rate is the share of plays under five seconds with no CTA or gate interaction, tracked since May 2024. Opt-in rate is play gate submissions over displays. Stats refresh roughly every two hours and are reported in UTC.

Sale attribution runs through a conversion script you drop on the thank-you page. It matches the buyer back to a viewer by cookie, IP, and an etag, within a window you choose from thirty days to a year, and a global script on every funnel page enables cross-page attribution. A server-side path exists through a session id appended to the URL that a partner platform posts back with order value. Pixels can fire every one percent, every five percent, or at standard milestones, plus play, pause, restart, resume, and gate submit, browser-side only.

The VSL feature set is complete and closest to Vturb's. Smart Autoplay plays muted with an overlay and restarts the video from the beginning with sound when clicked. Resume stores position per video. Exit thumbnails show on pause within up to ten timed ranges. Custom HTML CTAs reveal hidden page elements at a timestamp or on pause, with options for returning viewers. Experiments split two variants fifty-fifty against one success metric and a winner recommender with undisclosed thresholds. Video conditions swap in a different video by screen width, OS, returning status, language, URL parameter, or tag. There is no fake progress bar and no pitch-time field.

The public API is quota-limited by plan, windows are capped at one month, and data retention is not documented. Privacy is a disable-cookie switch with no documentation of what stops flowing.

What Vidalytics is not: it is not opinionated. It gives you every lever and lets you decide, which is why it is the one the 2026 playbooks name alongside Wistia.

## What this means for the player

The tracking primitive is settled. Five-second resolution, an anonymous device id with a shorter session id, and a collector that accepts a small set of events. Nobody does better than five seconds and nobody needs to. The decision that matters is whether we store time reached like Vturb or time watched per second like Wistia. Storing per second costs little and gives us both curves, including rewatch spikes, so there is no reason to collapse it.

Pitch time should be a field on every video, not a feature. Vturb proved that splitting every metric into before and after the pitch is the single most useful thing a VSL host does, and neither Wistia nor Vidalytics has it.

Attribution is the real product. Vturb's approach, encoding session and seconds-watched into the outbound click, is the one that produces a number marketers trust, because it answers "how far in was the buyer." Vidalytics' thank-you-page script is the fallback when you do not control the checkout. The player can do both, and because the application form is ours, a prospect who submits the form is identified without any URL tricks, which gives us Wistia's retroactive attachment for free.

The gimmicks are toggles. Smart autoplay, hidden playbar, no-seek, fake progress curve, delayed button reveal, resume, pause thumbnails, and speed tests all exist across the three. None of them changes what gets tracked. They are per-video settings with defaults, and the default for an affluent audience is all of them off.

The metric vocabulary should be Wistia's definitions with Vidalytics' additions. A play is first frame rendered. Play rate is unique plays over unique loads. Engagement is average share watched. Add bounce rate under five seconds, unmute rate, and pitch retention. Say explicitly that autoplay inflates play rate instead of pretending it does not.

Two things none of them do well, and we should. Retention windows are undocumented or two years at best; ours should be stated. Consent handling is an afterthought everywhere except Wistia; ours should be a first-class player mode from the start, because the same tool has to serve audiences in markets where that is not optional.

## Video analytics inventory

Compiled 2026-11-04 from each vendor's own help center and API reference.

This is the full list of what the three players we benchmark against actually measure, named the way they name it, so we can decide what tapt's player tracks and reports. It is an inventory, not a recommendation. The last section reads across the three to show the common core and the raw event that makes all of it derivable, which is the shape our own tracking has to capture from day one.

### Wistia

Per video. Plays, defined as initial play button clicks in a session, with repeat plays, pauses and rewatches inside one visit counted once. Play rate, the share of unique page loads that turned into a play; autoplay can push it above 100 percent. Engagement, also called average engagement or engagement rate, the average percentage of the video watched across all plays. Time played, the total time viewers spent watching in the date range. Unique visitors, distinct people who loaded the content at least once. Unique page loads, the visitors who loaded the player, which is the play rate's denominator; a visit is counted when a page with the player loads. Form submissions from Wistia Forms. For every action (call to action, annotation link, form) an impression count, an action count and a conversion rate of interactions over views of that action. The media page splits into Embed, Traffic, Engagement, Social and Audience tabs: Embed lists where the video is embedded and plays per location in the date range; Traffic covers page referrers, UTM parameters and viewing device; Engagement holds all-time plays and engagement plus the heatmap list; Social covers posts published to social; Audience (formerly Conversions) holds form submissions and per-submission details. Engagement totals are all-time while Embed totals follow the date range, so they do not reconcile. A Compare view sets one video against others.

Engagement graph. A blue curve of how many viewers were watching at each point of the video, and an orange band above it for how many times each section was replayed. Hover reads the value at a point, click plays from there. Waypoints under the graph mark actions (CTAs, annotation links) with their data; grey dots mark chapters with their click totals.

Heatmaps. One per viewing session on Wistia's player. Each shows the date and time, who (name or network, with the total number of the account's videos that person has watched in a blue box if identified or grey if anonymous), the device as a phone icon, and on expansion the browser and environment, the IP address and the page the video was played on. The timeline is colored by what happened: white for never played, green for played once, yellow for twice, orange through dark red for more rewatches, with a grey waypoint dot where a CTA or annotation was clicked. The end of the bar carries the total percentage played, counting repeated parts once. The audience table on a video merges every session of a viewer in the date range into one heatmap.

Audience and viewers. An Audience page with Total audience (identified and unidentified, the latter shown by network and location) and Identified viewers (from Wistia Forms or email campaign links, with a Forms filter). Each row shows total play count, email, source and last view date. A View Stream lists every public view account-wide, live, with name, location, device and IP. A viewer page shows every session with date and time, the number of videos watched, total time watched, average engagement on your media, and exports the viewer's sessions to CSV. Identification comes from a Wistia Form, an email campaign link carrying a wemail parameter, or a logged-in Wistia user.

Account and project level. An Overview for owners and managers with tiles for plays, play rate, engagement, time played, unique visitors and form submissions, a line chart by day, week or month with an image export, and two tables: top media by plays (sortable by plays, play rate, time played, unique visitors, form submissions, with a CSV that includes unique page loads and unique plays) and top domains with embeds (sortable by visits, plays, play rate, time played, engagement, unique visitors, with a per-embed CSV holding media, folder, domain, path, URL, page title, placement above or below the fold, player size, plays, visits, play rate, time played, engagement, unique visitors and conversion rate, limited to the last six months). Filters: date range, file type, all media or folders or channels, tags, and customizations present (autoplay, loop, form, annotation links, CTA, Eventbrite, Marketo). Project stats hold load count, play count and hours watched.

Stats API, the raw layer. Per account and per project: load_count, play_count, hours_watched. Per media: load_count, play_count, play_rate (0 to 1), hours_watched, engagement (0 to 1), visitors, and an actions array with type, action_count, impression_count, rate, url and text. Per media engagement: engagement plus engagement_data and rewatch_data, the integer arrays behind the graph. Per media by date: date, load_count, play_count, hours_watched. The newer analytics endpoint returns, for a date range of up to two years: unique_loads, unique_plays, plays, play_rate, played_time in seconds, unique_visitors, engagement_rate, cta_impressions, cta_conversions, cta_conversion_rate, form_conversions. Per visitor: visitor_key, created_at, last_active_at, last_event_key, identifying_event_key, load_count, play_count, visitor_identity (name, email, org name and title) and user_agent_details (browser, browser_version, platform, mobile), filterable by has_name, has_email or identified_by_email_gate. Per event, which is one viewing session: received_at, event_key, visitor_key, embed_url, percent_viewed, ip, org, country, region, city, lat, lon, email, media_id, media_name, media_url, iframe_heatmap_url, thumbnail, conversion_type, conversion_data (email, first and last name, is_new_lead) and user_agent_details; events are kept two years and percentages are rounded to whole numbers. Player-side, the embed can be told an email and a doNotTrack flag, and GA4 can receive events.

### Vidalytics

Account level. An Analytics Home for the whole account, a folder, a group or one video, with timeline graphs, summary stats, filters and downloads. A Dashboard with headline plays, play rate, conversions, revenue and conversion rate, a graph switchable between plays, play rate, average percent watched, opt-in rate, CTA click-through rate, tags triggered rate and conversion rate, panels for top videos by plays, best converting CTAs, most triggered tags and a conversion breakdown, plus device, location and traffic source panels. Dashboard plays are unique plays over the last thirty days. Stats refresh about every two hours and report in UTC.

Counting rules. A play is a playback start, never a page load. Total plays count every start including repeats; unique plays count a viewer once per video. A muted autoplay counts as a play, so they advise an always-muted autoplay if the unmute rate is to mean anything. A viewer is a vidalytics_uid in localStorage with no expiry, so returning means the same browser on the same domain whenever it comes back.

Per video table, one row per segment. Plays. Play rate, successful plays over total sessions (another page says unique viewers who played). Unique plays and unique viewers. Engagement, also shown as average percent watched, total watched time over total watches times video length. Impressions, player loads on a page. Unmute rate, viewers who actively unmuted, where a click on the autoplay overlay or an autoplay with sound counts and a muted video never clicked does not. Bounce rate, plays under five seconds with no CTA or play gate action. Conversions, viewers who completed the tracked action after watching inside a conversion window whose length is not published. Conversion rate, conversions over unique plays (another page says unique viewers). Revenue, from a default value per conversion or a dynamic value passed in the conversion code. Average order value, revenue over conversions. Opt-ins, play gate submissions, and opt-in rate, submissions over gate displays. Total watch time is plays times engagement times length.

Graphs. An audience graph of viewers watching at each second. A conversions graph by second, overlaid on the audience graph so you see where conversions begin against retention. Skip and rewind heatmaps on the timeline, a skip counted each time the bar is moved forward past a section and a rewind each time it is moved back, darker where more viewers did it. Markers on the graph for CTAs, play gates and products. A compare period mode draws the previous period dashed under the current with percent differences on every card.

Funnel view. Up to five steps in timeline order, chosen from watched 25, 50, 75 and 90 percent, unmuted, clicked CTA, submitted play gate, conversion script triggered, and any Script Map section; each bar shows viewers reaching it, the drop from the previous step and the share of all viewers; the logic is open, so a viewer counts in a later step without the earlier ones; compare two videos or two periods; export CSV or XLSX.

Segments. Behavior: converted, new versus returning, muted versus unmuted, embed location, tags triggered. Technology: device (desktop, mobile, tablet) and browser. Demographic: geo. Time: time of day and day of week. URL tracking: any URL parameter on the page such as utm_source. Affiliates: ClickBank and other affiliate sources. Several segments can be on at once.

Script Map. Label sections of the video (hook, story, offer, close), by hand or generated from captions, up to fifty, and read the table per section: plays, unique viewers who reached it, average percent of the section watched, completion rate (reached its end over reached its start), conversions, conversion rate, revenue, revenue per viewer and average order value. Whole-video metrics (play rate, bounce, impressions, unmute, gate and CTA) blank out while a section is selected. Sections can be funnel steps and export with a section column.

Benchmarks. Your play rate, unmute rate, bounce rate, retention at 25, 50 and 90 percent, CTA click rate, opt-in rate and conversion rate against anonymized platform medians and 25th, 50th and 75th percentiles, grouped by industry and video type, with a top or bottom percent tag and a trends view over time.

Events out. To Google Analytics or Tag Manager: play, pause, pause percentage with a value, watched percent at 25, 50, 75 and 99, and play gate submit, labeled by video title. Facebook pixel and ActiveCampaign tagging are offered on the same engagement events. In-player, tags fire once per viewer at a timestamp, on a CTA click or on a branch choice, and reach a CRM by Zapier or URL parameters.

Exports and housekeeping. CSV and Excel from video stats, funnel and Script Map, a shareable stats link, IP filtering for test traffic, and a reset that wipes a video's stats.

### VTurb

Summary tab. Ten metrics on a timeline: views, unique views, plays, unique plays, play rate (unique plays over unique views), engagement (average watched time over duration, from their primer), button clicks, conversions, conversion rate, revenue. Up to seven custom metrics on top of those, each either a retention-at-a-moment metric (for example retention to three minutes, which they call a lead retention) or a formula over the other metrics with add, subtract, multiply, divide and parentheses, shown as a number, a percent or a currency; the example given is average ticket, revenue over conversions. Metric sets can be saved as templates and imported into other videos.

Retention tab. The retention curve across the video with engagement and views read directly on it, the custom metrics and the pitch moment plotted on the same timeline, and a conversions line that is cumulative from the moment the checkout button appeared. Filters: country, device (mobile or desktop), operating system, browser and traffic source, each comparing metrics across its values. Traffic source comes from src, sck, utm_source, utm_medium, utm_campaign, utm_term and utm_content. Download CSV or XLSX.

Conversion and revenue. Checkout platforms are connected by a webhook and a conversion key (v3_ plus session, player, the click time and the test variants) injected into a URL parameter of the buy button. The button click is the conversion moment, and clicks after the video ends count at its last second. A conversion is a sale of the main product only; revenue includes order bumps and upsells attributed to the click; sales recovered by email or WhatsApp are not counted. Button clicks count every link click on the page, including page-builder buttons, with classes to include or exclude a button. Revenue per view appears in the test reports.

Tests. A/B tests of whole videos behind one embed with a traffic split, reporting play rate, engagement, button clicks and revenue per view per variant, a live view of viewers watching right now per variant, a best-times heatmap by weekday and hour for any of the eleven metrics, and a reset. Headline tests and autoplay tests report unique views, play rate, retention at the pitch, conversions, conversion rate and revenue per version, with an automatic winner at a chosen statistical confidence after at least a hundred views.

Account and app. Revenue, views, plays, conversions and conversion rate account-wide, top countries by views and conversions, a ranking of videos, and per video the retention curve and a conversion funnel.

### Reading across the three

The core every one of them reports, under slightly different names, is: loads or impressions, plays and unique plays, play rate, average percent watched, total watch time, a retention curve by second, rewatch and skip behavior on that curve, the actions shown and taken (CTA, form, gate, button click), conversions with revenue and an average order, and a split of all of it by device, browser, country, page and traffic source over a date range. Each adds one thing the others lack: Wistia keeps a per-session heatmap and identifies the person; Vidalytics overlays conversions on retention, counts unmutes and bounces, segments by returning and by converted, and reads the video by script section; VTurb treats the buy-button click as the conversion moment, ties revenue back through the checkout, and lets the operator define retention-at-a-moment and formula metrics.

All of it derives from one record per viewing session, which is what Wistia's event exposes and what tapt should store as its atom: the video, the page URL and its parameters, the time, a durable visitor key, the identity when known, IP geography and user agent, a per-second map of which seconds were watched and how many times, the actions shown and taken with their timestamps, the unmute, and the conversion with its value when one arrives. With that record every number above is a query, and the per-prospect view that is tapt's reason to exist falls out of it.

Gaps in the sources. Wistia's Traffic and Embed tab details and its newer analytics filters were not readable; VTurb does not publish its engagement formula or the conversion attribution window; Vidalytics does not publish its conversion window and disagrees with itself on the denominators of play rate and conversion rate.

Sources. support.wistia.com and docs.wistia.com (Media Analytics Overview, Viewer Analytics, Heatmaps, Account Overview Analytics, Average User Engagement, the Stats and Analytics API references); help.vidalytics.com (Analytics Home, Dashboard, Video Stats, metrics table, plays, Funnel View, skips and rewinds, Script Map, Benchmarks, Compare Period, returning viewers, GA and GTM events); help.vturb.com (Summary tab, Retention tab, A/B test, headline test, Smart Autoplay test, conversion tracking, button clicks, URL parameters, play rate tips, the mobile app).

## Sources

- Wistia: docs.wistia.com and support.wistia.com, particularly the Stats API reference, player events, webhooks, heatmaps, and privacy mode pages.
- Vturb: help.vturb.com, docs.vturb.com, and the public SmartPlayer bundle at scripts.converteai.net.
- Vidalytics: help.vidalytics.com, player-docs.vidalytics.com, the public API Postman collection, and the public loader and conversion scripts at quick.vidalytics.com and fast.vidalytics.com.
- Not confirmed from primary sources: Wistia's heartbeat interval, all three privacy policies, and data retention periods for Vturb and Vidalytics.
