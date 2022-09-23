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
#### Response
```
[Code] Company Name           Role        $ Earned      PAX Transported  Cargo Transported  # Flights (Flight Hrs)
----------------------------  ----------  ------------  ---------------  -----------------  ----------------------
⏸️ [BGAV] Braam Aviation       Manager     359,561       9                185573             8 (11.45)             
[PNAS] Paden Airways          Dispatcher  0             0                0                  3 (3.91)              
[TANG] Tangent Airways        Dispatcher  3,617         0                5316               2 (1.34)              
[VMSW] Valley Mountain Skyw   Dispatcher  0             0                0                  4 (3.65)              
[JPPA] JaPPa Air              Founder     4,417,315.14  151              2606936            90 (154.93)           
[LOON] Loon Airways           Dispatcher  80,314        0                50592              1 (2.48)              
[HMOD] Hansens Mekk og Drekk  Manager     683,078.97    1775             128074             42 (51.07)         
```

### Fleet (/fleet)
lists all of the fleet for a given company or VA
#### Response
```
There are 6 aircraft currently in the fleet
#  Type  Identifier  Name                                   Status  Current Airport                  Max Payload  Pax E/B/F
-  ----  ----------  -------------------------------------  ------  -------------------------------  -----------  ---------
1  HELO  N7270Y      Airbus H135 Phi Air Medical N380PH     ✅ Idle  EHAM - Amsterdam, Noord-Holland  3150 lbs     7/0/0    
2  HELO  N6009K      Airbus H135 Phi Air Medical N380PH     ✅ Idle  LOWS - Salzburg, Salzburg        3150 lbs     7/0/0    
3  JET   N9837A      Airbus A320 Neo Asobo                  ✅ Idle  KHST - Homestead, Florida        56385 lbs    0/0/0    
4  METL  N4156N      Beechcraft King Air 350i Asobo         ✅ Idle  KINS - Indian Springs, Nevada    6090 lbs     0/0/0    
5  JET   N1883M      Cessna Longitude Aviators Club Livery  ✅ Idle  LEMD - Madrid, Madrid            6129 lbs     0/0/0    
6  JET   N6526N      Airbus A320 Neo Asobo                  ✅ Idle  EGLL - London, England           56385 lbs    0/0/0    
```
### Jobs (/jobs)
lists all of the pending or in-progress jobs for a given company or VA
#### Response
```
There are 2 pending jobs
Type                Pay       Cargos              Status  Aircraft  Depart  Destin  Current  Distance
------------------  --------  ------------------  ------  --------  ------  ------  -------  --------
Dangerous Material  $762,080  1 leg                                                                  
                              Valuable Equipment  ✅ Idle  N9837A    KHST    KFTW             991 NM  
Goods transport     $1,110    1 leg                                                                  
                              Dry Ice             ✅ Idle  N4156N    KINS    NV65             17 NM  
```

### Flights (/flights)
lists all of the pending or in-progress flights for a given company or VA
#### Response
```
TBD
```

## Planned Features
* Add cash flow related commands to indicate income vs expense and profit margins
* Add persistence layer e.g. db to track data over time
* polling & alerting functionality for flight & job status changes