---
title: Toolset
description: What each tool in a funnel is for and what it measures, written down in order to remake every one of them.
---

## Intention

When you move through any funnel, a set of tools is always present. Each one has a specific, designed purpose. This document establishes what each tool is for and what it measures. The goal is to remake every one of them. It is ongoing.

## Problem

Log into Vidalytics, Wistia or Vturb. They host VSLs. Each has started adding forms, CTA buttons, titles. Typeform now hosts pages. Schedulers have forms in them. SalesKick merged the form and the calendar and sells itself as replacing both. Every tool a marketer uses is expanding its scope to become every other tool. Follow the pattern to its end and every tool is a full stack CRM that started out as a form.

## Stance

There will be one place for all the tools. That is not a CRM. GoHighLevel technically has every tool, but it was built around one main thing and everything else is an add-on. Build a landing page in it and you can tell. When one tool is the main tool, everything around it gets less care.

The stance here is the opposite: every tool individually, at once, to the same bar. The tools marketers end up using will reflect that.

## Scope

Start with the call funnel. It is the simplest and the most common. Webinars are popping right now and hosting them may come later, but the first targets are the small tools that are pivotal to every funnel. Simple things that are currently stitched together: Typeform plus Calendly, Typeform plus Cal.com, Zapier between them.

Phase one is four tools, in the order a visitor meets them.

## Map

A call funnel runs on nine tools and one layer under all of them. Even the attribution tools prove it: Trakyo's own landing page is a Wistia player and a Calendly embed.

### 1. The site: ClickFunnels, Framer

The pages the other tools are embedded in. ClickFunnels is the direct response one, now drifting toward being a CRM. Framer is for designers, not marketers. AI builds pages better than either, so the slot that matters is the layer above the page: what it did. That is the Tracker.

### 2. The player: Vidalytics, Wistia, Vturb

Hosts the VSL. Marketers run three because each has micro features for a different buyer. Vturb is B2C: gimmicks like a progress bar that runs fast early and slow late. Wistia is premium and clean, B2B leans there. Vidalytics is pure DR, sold on conversion lift alone. A VSL is a sales letter that happens to be video. The player exists to measure it.

### 3. The form: Typeform, Jotform, Tally, Google Forms

Captures and qualifies the lead. Typeform is the standard: one question per screen, so drop-off is measured per question. The rest are the same tool with a different reason to exist. Also used internally: closers' end of day reports are Typeforms too.

### 4. The scheduler: Calendly, Cal.com, iClosed, SalesKick

Gets the qualified lead onto a closer's calendar. Calendly is default because it integrates with Typeform. Cal.com is a cleaner Calendly. iClosed is built by sales reps for sales reps. SalesKick already merged the form and the calendar. This slot is less marketing and more sales ops, and has to be built for that layer.

### 5. The glue: Zapier, n8n

Automations between the rest. Payment lands, ping Slack. Call booked, cancelled, rescheduled, refunded, closer's EOD report in. Operators cannot run a funnel without it because every tool reports from its own place. It exists only because the tools share no spine. Build the spine and the glue disappears.

### 6. Email: ActiveCampaign, Mailchimp, Klaviyo, Kit

Two different tools wearing one name. Info runs nurture: the newsletter, the follow-up sequence after the opt-in, direct response in the inbox. Ecom runs retention: subscribe for 10% off, then the list is where repeat purchases come from. Klaviyo owns ecom. Kit, formerly ConvertKit, is where the newsletters come from. ActiveCampaign and Mailchimp are the general ones. Measures: opens, clicks, replies, and for ecom, revenue per send.

### 7. Payments: Shopify, Whop, Commas

Where the money lands, and above a certain size, where the brand stops processing on generic rails and builds its own network of processors. Shopify is ecom. Whop is info: a payment layer first, but also the fulfillment platform, the course or community lives there too. Commas is the incoming Whop competitor, fulfillment, funnel and processor in one. Measures: pitch to close, refunds, chargebacks.

### 8. CRM: GoHighLevel, Close, HubSpot, Salesforce

Where the lead goes after the form and the scheduler: the pipeline, the follow-up, the dialing. GoHighLevel is the all-in-one, affiliate-driven, clunky, built for agencies and low-tier service providers. Mud. It still makes people money, which is why so many try to leave it and cannot. Close is the sales floor CRM: dialing and smart views are the reason it exists. HubSpot and Salesforce are the enterprise end, no first-hand opinion yet. Each one is better in one category, and that category is what to name per tool. Measures: speed to lead, contact rate, pipeline stage conversion.

### 9. AI: Manus, ChatGPT, Claude

The formless tool. Operators are not technical and do not want to be, so the most technical thing you will see one use now is Manus: Meta owns it, Meta is where they buy ads, so they trust it to build the pages. Claude Code inside VS Code is the other end, where a funnel is built and iterated as code. This is what empties the site slot. Nobody needs a page builder when AI hooks up to anything. Measures: none. It is the hand, not the tool.

### The layer: the pixel, attribution, data

Meta Pixel, conversions API, any pixel. The click on the landing page is the base rate every other number is measured against. Today each tool counts its own: Typeform counts its own views, the player counts its own plays, neither knows about the landing click. Play rate ends up measured off the embed view instead of the click that got them there. Redundant tracking.

Attribution stitches the events into one person's journey. Hyros for info and ads broadly, Trakyo for YouTube, Triple Whale and Northbeam for ecom. Not which creative converted, but the whole path: the first video they saw three months ago, the three they watched in one weekend, the first click that did not convert, the one that did.

Underneath that is the principle: one source of truth. Every decision in the funnel is made off a number, so the number has to be right and in one place. Nine tools each keep their own copy. Attribution tools are bought to reconcile them, and past a certain size it becomes a warehouse with every tool piped in. One spine makes all of it unnecessary.
