---
name: web-search
description: Use for ANY request that needs information from the internet - prices, store catalogs, news, versions, docs, facts, checking whether something is still true - even when the user does not say "search". Routes the lookup to the max-kit web-researcher agent when agents are available, otherwise searches inline under the same budget and output format.
---

# Web search routing

Use this whenever the answer depends on current information from the internet.

## If you can launch agents (Claude Code, Cowork, project threads)

1. Do not call WebSearch or WebFetch yourself in the main conversation.
2. Launch the `max-kit:web-researcher` agent (the subagent type may also be listed as `web-researcher`). Pass it one self-contained request: what to find, for which city or region, which stores or sources to prefer, and the format you need back (for a list of items, ask for a table).
3. Independent questions go to separate web-researcher agents launched in parallel in one step.
4. If no web-researcher agent is listed in your available agent types, launch a general-purpose agent with `model: haiku` and paste the "Rules for the search" section below into its prompt.
5. Use the agent's answer as is: keep its sources and confidence line, and do not repeat the search unless the answer says "not found" or is clearly wrong.

## If you cannot launch agents (claude.ai chat)

Search yourself, following the rules below.

## Rules for the search

- Budget: one question up to 6 searches and 5 page fetches; a list of items up to 10 searches and 12 fetches. Run independent lookups in parallel.
- Read search snippets first and fetch a page only when the snippets are not enough. When fetching, ask only for the needed facts.
- Prefer official and primary sources. For prices, use the store's own site and name the city or region if the page shows it.
- Never fill gaps from memory: say "not found" and what was tried.
- Answer in the user's language (default Russian) as: **Answer** (facts or a compact table), **Sources** (1-5 links), **Confidence / date** (one line).
