# OnAir Discord Bot
A bot that integrates Your OnAir Company or VA's details into Discord. Currently has the ability to show flights, members, jobs, fleet, and cash flow information all from within discord.

## How to use
* clone the repository `git clone git@github.com:vams-app/onair-discordbot.git`
* install the required nodejs modules `npm i`
* copy `.env-example` to `.env`
* fill out `.env` with required information
* finally, run the bot by executing `npm start`

Bot should send a message in the configured channelId when it comes online. Interact with the bot using one of the below commands

## Bot Commands

### Members (/members)
lists all the current VA members

### Fleet (/fleet)
lists all of the fleet for a given company or VA

### Jobs (/jobs)
lists all of the pending or in-progress jobs for a given company or VA

### Flights (/flights)
lists all of the pending or in-progress flights for a given company or VA

## Planned Features
* Add cash flow related commands to indicate income vs expense and profit margins
* Add persistence layer e.g. db to track data over time
* polling & alerting functionality for flight & job status changes