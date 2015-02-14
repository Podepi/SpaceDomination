/*
Fighters
 - Money per damage point: 3000
 - Money per hull point:       1000
Corvettes
 - M/D: 2900
 - M/H: 950
Frigates
 - M/D: 2800
 - M/H: 900
Cruisers
 - M/D: 2700
 - M/H: 850
 */
var data = {
"ships":[
    {
        "y":-224, "x":0,
        "available":true,
        "name":"Probe",
        "type":"Exploration",
        "description":"A fully autonomous spaceship which can send back data regarding the chosen planet.",
        "cost":800, "resources":8, "crew":0, "damage":0, "hull":1
    },
    {
        "y":-224, "x":-32,
        "available":true,
        "name":"Colony Ship",
        "type":"Exploration",
        "description":"Colonises the chosen uninhabited planet. The ship's terraforming equipment will make the planet more habitable.",
        "cost":150500, "resources":150,
        "crew":500000,
        "damage":0,
        "hull":20
    },
    {
        "y":-224, "x":-32,
        "available":true,
        "name":"Transporter",
        "type":"Exploration",
        "description":"Transports a large amount of people to another planet. Build this ship in the planet you want to remove population from, deconstruct in the planet you want to add people to.",
        "cost":200500, "resources":200,
        "crew":2000000,
        "damage":0,
        "hull":20
    },
    {
        "y":-192, "x":0,
        "available":false,
        "name":"Fighter",
        "type":"Military",
        "description":"A small, nimble spaceship developed for battle in space. Due to its small size, it is very lightly armoured.",
        "cost":9050, "resources":40,
        "crew":2,
        "damage":3,
        "hull":9
    },
    {
        "y":-192, "x":-32,
        "available":false,
        "name":"Corvette",
        "type":"Military",
        "description":"Larger and more expensive than the fighter, this spaceship requires more crew, but is more heavily armoured and can deal more damage.",
        "cost":47800, "resources":465,
        "crew":20,
        "damage":16.5,
        "hull":50
    },
    {
        "y":-192, "x":-64,
        "available":false,
        "name":"Frigate",
        "type":"Military",
        "description":"A medium-size spaceship which is more heavily-armoured and can deal more damage than a corvette.",
        "cost":200500, "resources":2005,
        "crew":150,
        "damage":71.5,
        "hull":223
    },
    {
        "y":-192, "x":-64,
        "available":false,
        "name":"Cruiser",
        "type":"Military",
        "description":"A large, expensive spaceship with enough firepower to destroy a frigate with a single shot.",
        "cost":1000500, "resources":7505,
        "crew":1500,
        "damage":370.5,
        "hull":1177
    }
],
"buildings":[
    {
        "name":"Factory",
        "description":"Upgrading this building will increase resource and money gain.",
        "cost_factor":50000,
        "base_cost":30000
    },
    {
        "name":"Laboratory",
        "description":"Scientists research new technologies here. Upgrading this building will increase science gain.",
        "cost_factor":80000,
        "base_cost":50000
    },
    {
        "name":"Shipyard",
        "description":"A space station where spaceships can be repaired. Upgrading this building will increase repair rate.",
        "cost_factor":50000,
        "base_cost":50000
    }
],
"science":[
    {"name":"starter tech", "researched":true},
    {
        "x":0, "y":0,
        "name":"Extra income scheme",
        "desc":"+20% income",
        "researched":false, "req":0,
        "cost":500, "inc":0.2
    },
    {
        "x":-224, "y":0,
        "name":"Galactic supercomputer",
        "desc":"+50% science gain from all planets",
        "researched":false, "req":0,
        "cost":500, "inc":0.5
    },
    {
        "x":-224, "y":0,
        "name":"Fast-growing crops",
        "desc":"Increases population growth by 50%",
        "researched":false, "req":0,
        "cost":500, "inc":0.5
    },
    {
        "x":-224, "y":0,
        "name":"CO2 recycler",
        "desc":"Colonised planets gain an extra +1% habitability per turn",
        "researched":false, "req":0,
        "cost":200, "inc":1
    },
    {
        "x":0, "y":-192,
        "name":"Fighters",
        "desc":"Allows you to build fighters to defend and attack planets",
        "researched":false, "req":0,
        "cost":100, "inc":1
    },
    {
        "x":-32, "y":-192,
        "name":"Corvettes",
        "desc":"Allows you to build corvette spacecraft to better defend and attack planets",
        "researched":false, "req":5,
        "cost":200, "inc":1
    },
    {
        "x":-64, "y":-192,
        "name":"Frigates",
        "desc":"Allows you to build frigates to take your galactic fleet to the next level",
        "researched":false, "req":6,
        "cost":350, "inc":1
    },
    {
        "x":-64, "y":-192,
        "name":"Cruisers",
        "desc":"Allows you to build cruisers to make your galactic fleet unstoppable",
        "researched":false, "req":7,
        "cost":500, "inc":1
    },
    {
        "x":0, "y":-192,
        "name":"Lightweight carbon alloys",
        "desc":"Fighters gain +4 hull",
        "researched":false, "req":5,
        "cost":250, "inc":4
    },
    {
        "x":-32, "y":-192,
        "name":"Ablative armour tiles",
        "desc":"Corvettes gain +40 hull",
        "researched":false, "req":6,
        "cost":1000, "inc":40
    },
    {
        "x":-128, "y":0,
        "name":"Plasma shields",
        "desc":"Frigates gain +75 hull",
        "researched":false, "req":7,
        "cost":2500, "inc":75
    },
    {
        "x":-160, "y":0,
        "name":"Explosive rounds",
        "desc":"Fighters deal +3 damage",
        "researched":false, "req":5,
        "cost":125, "inc":3
    },
    {
        "x":-288, "y":0,
        "name":"Automatic turrets",
        "desc":"Corvettes deal +8 damage",
        "researched":false, "req":6,
        "cost":500, "inc":8
    },
    {
        "x":-288, "y":0,
        "name":"Weaponised exotium",
        "desc":"Frigates deal +21 damage",
        "researched":false, "req":7,
        "cost":1250, "inc":21
    }
]};
