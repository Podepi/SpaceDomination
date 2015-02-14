//images (64x64)
var img_artifacts = "images/iconlist_artifacts.png"; // 64x64 misc. object  spritesheet
var img_magic = "images/iconlist_magic.png"; // 64x64 magic spritesheet
var img_physical = "images/iconlist_physical.png"; //64x64 physical attack spritesheet
var img_ui = "images/iconlist_ui.png"; //64x64 ui spritesheet
var img_def64 = "images/default_64.png"; //default 64x64 image

//icons (16x16)
var ico_list = "images/icon_list_16.png"; //16x16 icon spritesheet

//Arrays
var ships = {}; // This array contains the various spaceships
var planets = []; // This array contains all of the planets you know about
var building_resources = ["Metal", "Glass", "Robotic Parts", "Exotium"];
var other_resources = ["Water", "Food", "Oxygen"];
var event_log = [];

// Add planet modifiers which change resource production, income, science gain, habitability rating, ship repair rate etc.

// Descriptors for planets
var l_adj = ["Snowy", "Scorching", "Rainy", "Freezing", "Sunny", "Depressing", "Desert", "Cloudy", "Militaristic", "Peaceful", "Tropical",
             "Stormy", "Warm", "Harmless", "Corporate", "Metallic", "Fertile", "Dangerous", "Safe", "High-tech", "Mountainous", "Scientific"];
var l_of = ["Hope", "Betrayal", "Inhospitability", "Water", "Earth", "Air", "Fire", "Steel", "Iron", "Stone", "Technology", "Clay", "Heat", "Frost", "Wind", "Light", "Miracles",
            "Knowledge", "Power", "Progress", "Wisdom", "Death", "Sacrifice", "Danger", "Harm", "Warmth", "Sand", "Rivers", "Science", "Safety", "Clockwork", "Frogs", "Shade", "Rain"];

//                 Planet type : Description : Max size : Text on visit

var l_location = ["Uninhabited Planet:This planet is uncolonised<br><br>:0:The barren surface of the planet appears in your viewport. This planet is free to conquer.",
                  "Outpost:A colonised planet with a relatively small population. These planets are part of a larger interstellar empire.:1000000:Your luxury overlord ship communicates with the small base on the surface.",
                  "Colony:A colonised planet with a moderately-sized population concentrated around a single city.:1000000000:The city here is visible from space, when it is on the night side of the planet and the viewers have a telescope.",
                  "Inhabited Planet:A planet with a population size in the billions. Problems such as overpopulation and pollution are showing up here.:50000000000:Much of the surface of the planet has been colonised, leaving hundreds of potential landing sites for your luxury space ship.",
                  "Urbanised World:This planet has much of its surface covered in cities. Scientific advancements have allowed the population here to flourish.:200000000000:The view from the top of your Emspire is a sight to behold. Your planet's capital city is laid out before you.",
                  "Galactic Headquarters:The home world of a highly-successful interstellar species, these systems are extremely difficult to take over in any sort of attack.:1000000000000:This is the main trading hub for dozens of star systems within several light years. Little do they know that their star system may be the next member of your Galactic Empire.",
                  "Ultimaworld:The pinnacle of planetary perfection, these planets are not only extremely difficult to invade, they can also produce more income than a starfaring civilisation.:0:You like this planet a lot for its money and minion production."];

//Game variables
var p_shiplist = []; // Contains ships controlled by player
var e_shiplist = []; // Contains ships controlled by enemy
var menuscreen = "inventory";
var current_location; // Your current location
var current_screen; // The menu you are on (ships, planets, buildings etc.) - used to make sure the interface updates properly
var enemy_number; // Amount of enemies in dungeon
var enemy_strength = 10; // How much health enemies have * current_location.difficulty
var btn1; // These variables are shorthand for the three event buttons
var btn2;
var btn3;
var info; // Shorthand for text above event buttons
var readout; // Shorthand for text below event buttons
var text_storage;
var exp = 3; // How many non-combatant ships there are, this variable is to stop the civilian ships from being involved in battle
var ships_to_buy = 1;

// Booleans
var battle = false; // Boolean defines whether hp potions display enemy health on readout
var dungeon = false; // Determines whether to give prize after defeating all enemies
var boss = false; // Determines whether you are fighting  a boss or not
var able_to_travel; // Determines whether you can travel or not
var inv_sell = false; // Boolean defines whether you are selling items or not
var shop = false;
var canvas_play = false;

// Default text
var readout_default = "<span style='color:red'>This part of the game is not yet functional. Probably best you don't touch anything here in case you mess up your save...</span>";
var wip_default = "<br><span style='color:red'>This part of the game is still new. Bugs are likely to be found here. Proceed at own risk!</span>";
var building_default = "NOTE: THIS BUILDING CURRENTLY DOES NOTHING.";
var l_h_default = "Current location: ";

//Sorting
var show_exploration = true;
var show_military = true;
var show_planet = [true, true, true];

//Stats
var stat_money = 100000;
var stat_population = 0;
var stat_science = 0;
var ships_bought = 0;
var ships_sold = 0;
var planets_discovered = 0;

function init() {
    'use strict';
    current_location = planets[0];
    for (var i in data.ships) {
        p_shiplist.push(createShip(data.ships[i]));
    } for (var i in data.ships) {
        e_shiplist.push(createShip(data.ships[i]));
    }
    $("#menubar").html(//'<li id="menubar_inf" class="menu_icon glow">Info</li>' +
                       '<li id="menubar_shp" class="menu_icon glow">Ships</li>' +
                       '<li id="menubar_pln" class="menu_icon glow">Planets</li>' +
                       '<li id="menubar_bld" class="menu_icon glow">Buildings</li>' +
                       '<li id="menubar_sci" class="menu_icon glow">Science</li>'
                       //'<li id="menubar_ecp" class="menu_icon glow">Encyclopedia</li>'
                       );
    /*$("#menubar_inf").on("click", function () {
        viewStats();
    });*/
    $("#menubar_shp").on("click", function () {
        viewMenu("ships");
    });
    $("#menubar_pln").on("click", function () {
        viewMenu("planets");
    });
	$("#menubar_bld").on("click", function () {
        viewMenu("buildings");
    });
    $("#menubar_sci").on("click", function () {
        viewMenu("science");
    });
    btn1 = $("#eventbutton01");
    btn2 = $("#eventbutton02");
    btn3 = $("#eventbutton03");
	info = $("#info");
	readout = $("#readout");
    readout.html("");
    for(var i = 0; i < ships.length; i += 1) {
        ships.pop();
    }
	initLocations();
    //initLevels();
    /*try {
        load();
    } catch (e) {
        reset("nodialog");
    }*/
    viewMenu("ships");
    viewStats("init");
    eventPlanet();
}
function createName() {
    var c = ["r", "t", "p", "s", "d", "f", "g", "l", "z", "x", "c", "v", "b", "n", "m", "q"];
    var v = ["a", "e", "i", "o", "u"];
    var syllables = [];
    var i, s = Math.ceil(Math.random() * 2) + 2;

    // Generate word from random vowel/consonant pairs
    for (i = 0; i < s; i++) {
        sm = Math.round(Math.random());
        letterVal = Math.floor(Math.random() * c.length);
        if (sm == 0) {
            var syl = c[letterVal % c.length] + v[letterVal % v.length];
            if (syl.charAt(0) == "q"){
                syl = "qu";
            }
            syllables.push(syl);
        } else {
            var syl = v[letterVal % v.length] + c[letterVal % c.length];
            if (syl.charAt(1) == "q"){
                syl = "qu";
            }
            syllables.push(syl);
        }
    }
    for (i = 0; i < syllables.length - 1; i += 1) {
        if (syllables[i] == syllables[i + 1]) {
            syllables.splice(i, 1);
        }
        if (syllables.length < 2) {return(createName())}
    }
    // Replace "qu" at the end of word
    if (syllables[syllables.length - 1] == "qu") {
        var syl = c[letterVal % c.length - 1] + v[letterVal % v.length];
        syllables[syllables.length - 1] = syl;
    }
    // Join word from array of vowel/consonant pairs, remove commas
    var word = syllables.join();
    while (word.search(",") > 0) {
        word = word.replace(",", "");
    }
    // Replace unwanted letter combinations
    var letter_replace = ["ii:i", "quu:qua que quo qui qu", "uu:ua au ue eu iu ui uo ou u", "oo:io oa o", "aa:ai ea a", "um:a e i o",
        "df:d f", "cq:c q", "zx:z x","vx:v x", "xb:x b", "gx:g x", "xd:x d", "fv:f v", "zg:z g", "mg:m g", "gv:g v"];
    for (i = 0; i < letter_replace.length; i += 1) {
        var l_split_1 = letter_replace[i].split(":"), l_split_2 = l_split_1[1].split(" ");
        if(word.search(l_split_1[0]) >= 0){
            word = word.replace(l_split_1[0], l_split_2[Math.floor(Math.random() * l_split_2.length)]);
        }
    }

    word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    return(word);
}
function createNameOld() {
    return(l_adj[Math.floor(Math.random() * l_adj.length)] + " Planet of " + l_of[Math.floor(Math.random() * l_of.length)]);
}
function tanh(arg) {
  //  discuss at: http://phpjs.org/functions/tanh/
  // original by: Onno Marsman
  // improved by: Robert Eisele (http://www.xarg.org/)
  //   example 1: tanh(5.4251848798444815);
  //   returns 1: 0.9999612058841574
  return 1 - 2 / (Math.exp(2 * arg) + 1);
}
function numberWithCommas(x) {
    // Copied and pasted from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
                                        // Explore functions
function nextTurn() {
    'use strict';
	window.setTimeout("nextTurnEnd()", 500);
	info.html("Next turn...");
	btn1.hide();
	btn2.hide();
	btn3.hide();
}
function nextTurnEnd() {
    var i, p = 0, science_bonuses = getScienceResearched(), bonus_income = science_bonuses[0], bonus_population = science_bonuses[1], habitability_gain = science_bonuses[2], bonus_science = science_bonuses[0];
    stat_income = 0;
    for (i = 0; i < planets.length; i++) {
        planets[i].resources += planets[i].production;
        p += planets[i].production;
        planets[i] = findPlanetType(planets[i]);
        if (planets[i].faction === 0) {
            planets[i].population += Math.round((planets[i].population * ((planets[i].habitability - 50) / 2000) * bonus_population));
            planets[i].income = Math.round((1.2 * Math.sqrt(planets[i].population) * bonus_income));
            stat_income += planets[i].income;
            stat_population += planets[i].population;
            stat_science += Math.round(4 * bonus_science);
        } else {
            planets[i].population = Math.round(planets[i].population * (1 + (planets[i].habitability - 50) / 2000));
            planets[i].income = Math.round(1.2 * Math.sqrt(planets[i].population));
        }
        if (planets[i].habitability < 100 && planets[i].population > 0) {
            planets[i].habitability += habitability_gain;
        } else if (planets[i].habitability > 100) {
            planets[i].habitability = 100;
        }
    }
    stat_money += stat_income;
	info.html("A turn has passed.");
    readout.html(generateReadout(p));
	btn1.show();
    if (current_location.population === 0 || current_location.faction !== 0) {
	   btn2.show();
    }
    btn3.hide();
    viewMenu(current_screen);
}
function generateReadout(p) {
    var t = "This turn:<br>";
    t = "You gained $" + numberWithCommas(stat_income) + " money from planetary income.<br>" +
    p + " resources were created.<br>You bought " + ships_bought + " spaceships and sold " + ships_sold +
        ".<br>You discovered " + planets_discovered + " planets.<br><br>";
    ships_bought = 0; ships_sold = 0; planets_discovered = 0;
    t += displayEvents();
    return(t);
}
function displayEvents() {
    var i, t = "Event log:<br>";
    if (event_log.length == 0) {
        t += "No special events."
    } else {
        for (i = 0; i < event_log.length; i += 1) {
            t += event_log[i] + "<br>";
        }
        event_log = [];
    }
    return(t);
}
function setInfo(new_text, reset) {
    if (info.text() != new_text) {
        text_storage = info.text();
    } else {return("");}
    if (reset != false) {window.setTimeout("setInfo(text_storage, false)", 2000);}
    info.html(new_text);
}
function travelToPlanet(p) {
    current_location = planets[p];
    $("#location_header").html(current_location.name);
    if (current_location.faction === 0 || current_location.population === 0) {
        eventPlanet();
    } else {
        eventPlanet("enemy", true);
    }
}
function eventPlanet(t, hide_message) {
    'use strict';
    $("#location_header").html(l_h_default + current_location.name);
    $("#menu_list_left").show();
    viewMenu(current_screen)
    eventShop("hide");
    btn1.show();
    btn1.html('<div class="btn_icon"></div>Next Turn');
    btn1.off('click').on("click", function () {
        nextTurn();
    });
    btn2.hide();
    if (t === "enemy") {
        info.html("You can see the surface of this planet through your viewport. The probe you sent here is proving very useful in planning where to attack.");
        btn2.show();
        btn2.html("<div class='btn_icon' style='background-position:-128px 0px; background-image:url(" + img_magic + ")'></div>Attack");
        btn2.off('click').on("click", function () {
			if (confirm("Attack this planet?") === true) {
				eventBattle();
			}
        });
    } else if (current_location.population === 0) {
        btn2.show();
        btn2.html("<div class='btn_icon' style='background-position:0px 0px; background-image:url(" + img_magic + ")'></div>Colonise");
        btn2.off('click').on("click", function () {
            if (confirm("Colonise this planet? (Requires a colony ship)") === true && p_shiplist[1].count >= 1) {
                p_shiplist[1].count -= 1;
                current_location.faction = 0;
                current_location.population = p_shiplist[1].crew;
                current_location = findPlanetType(current_location);
                event_log.push("You colonised " + current_location.name);
                info.html("The colonists have landed and are now setting up infrastructure vital to their survival.");
                eventPlanet("hide_message");
            }
        });
    }
    btn3.hide();
    btn3.html("<div class='btn_icon'></div>Town Square");
    btn3.off('click').on("click", function () {
        eventPlanetSquare();
    });
    if (t !== "hide_message" && hide_message !== true) {
        info.html(current_location.landing);
    }
    if (t === "shop") {
        info.html("A GR-337 robot escorts you to your destination");
    }
}
                                        //shop functions
function initShop() {
    'use strict';
    updateShop();
}
function updateShop() {
    'use strict';
    var iconx = shop_list[0].listx, icony = shop_list[0].listy, a, i, t = " ";
    for (a = 0; a < shop_list.length; a += 1) {
        iconx = shop_list[a].listx;
        icony = shop_list[a].listy;
        t += "<li id='" + a + "' class='shop'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div>" + shop_list[a].name;
        if (stat_gold < shop_list[a].gold) {
            t += "<i style='color:#FF0000'> - Not enough gold</i>";
        }
        t += "</li>";
    }
    $("#shop_list").html(t);
    $("#shop_heading").html("Shop");
    updateHealth();
    $("li.shop").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var item = shop_list[this.id];
            viewItem(item);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    $("li.shop").off("click").on("click",
        function () {
            var item = shop_list[this.id];
            //var info = $("#this.id").html();
            if (stat_gold >= item.gold) {
				stat_gold -= item.gold;
                updateShop();
				for (i = 0; i < inventory.length; i += 1) {
					if(inventory[i].itemid === item.itemid) {
						inventory[i].count += 1;
						viewMenu("inventory");
						return(" ");
					}
				}
				item.count = 1;
				inventory.push(item);
                viewMenu("inventory");
            }
        });
}
function eventShop(visible) {
    'use strict';
    switch (visible) {
    case "show":
        shop = true;
        inv_sell = false;
        //updateShop();
        $("#shop").show();
        btn1.html('<div class="btn_icon"></div>Exit to Town');
        btn1.off('click').on("click", function () {
            eventPlanet("shop");
            shop = false;
        });
        btn2.hide();
        btn2.html('<div class="btn_icon"></div>Sell Items');
        btn2.off('click').on("click", function () {
            shopSell();
        });
        btn3.hide();
        //info.html('The shopkeeper ' + shopkeeper[Math.floor(Math.random() * shopkeeper.length)]);
        able_to_travel = false;
        break;
    case "hide":
        $("#shop").hide();
        break;
    }
}
function shopSell() {
    "use strict";
    viewMenu("inventory");
    if(inv_sell === false) {
        btn2.html('<div class="btn_icon"></div>Stop selling items');
        btn1.hide();
        $("#shop").hide();
        info.html("Click on items to sell them for half price.");
        inv_sell = true;
		updateItems();
    } else {
        eventShop("show");
		updateItems();
        btn1.show();
    }
}
                                        //battle functions
function eventBattle(t, n) {
    'use strict';
    var i, text = readout.html(), s = data.ships.length, enemy_cash = 10500 + current_location.income * 30;
    for (i = 0; i < data.ships.length; i++) {
        e_shiplist[i].count = 0;
    }
    while (s > 0) {
        s = data.ships.length;
        for (i = 0; i < data.ships.length; i++) {
            if (data.ships[i].type !== "Military") {
                s -= 1;
                continue;
            }
            else if (data.ships[i].cost <= enemy_cash) {
                e_shiplist[i].count += 1;
                enemy_cash -= data.ships[i].cost;
            } else {s -= 1}
        }
    }
	btn1.show();
    btn1.off('click').on('click', function () {
        updateFight(text);
    });
    btn1.html('<div class="btn_icon" style="background-position:-256px 0px; background-image:url(' + img_magic + ')"></div>Fight');
    btn2.hide();
    btn3.hide();
    $("#menu_list_left").hide();
    battle = true;
    info.html("Far above the surface of " + current_location.name + ", a battle has started. Flashes of light are visible from kilometres away as the two sides fight with deadly waves of plasma and bullets.");
    readout.html("<table style='margin:auto; text-align:center; width:40%'><tr><td>Your ships<td>Enemy ships</tr><tr>" + checkShipNumbers() + "</tr></table>");
}
function updateFight(text) {
    'use strict';
    var i, loop, e_hull=0, e_damage=0, e_count=0, p_hull=0, p_damage=0, p_count=0;
    shipGetValues();
    for (i = 0; i < e_shiplist.length; i++) {
        if (e_shiplist[i].type === "Military") {
            e_damage += e_shiplist[i].damage * e_shiplist[i].count;
            e_hull += e_shiplist[i].hull * e_shiplist[i].count;
            e_count += e_shiplist[i].count;
        }
    }
    for (i = 0; i < p_shiplist.length; i++) {
        if (p_shiplist[i].type === "Military") {
            p_damage += p_shiplist[i].damage * p_shiplist[i].count;
            p_hull += p_shiplist[i].hull * p_shiplist[i].count;
            p_count += p_shiplist[i].count;
        }
    } console.log(text);
    for (loop = e_count; loop > 0; loop--) {
        var l = 0, a = Math.floor(Math.random() * (p_shiplist.length - exp)) + exp;
        while (p_shiplist[a].count <= 0 && p_count > 0) {
            a = Math.floor(Math.random() * (p_shiplist.length - exp)) + exp;
            l += 1;
            if (l > 20) {
                break;
            }
        }
        l = 0;
        if (p_count <= 0) {
            loop = -100;
            continue;
        }
        else {
            p_shiplist[a].hull -= Math.round(e_damage / e_count);
            while (p_shiplist[a].hull <= 0 && l === 0) {
                p_shiplist[a].hull += data.ships[a].hull;
                p_shiplist[a].count -= 1;
                if (p_shiplist[a].count <= 0) {
                    l = 1;
                }
            }
        }
    }
    for (loop = p_count; loop > 0; loop--) {
        var l = 0, a = Math.floor(Math.random() * (e_shiplist.length - exp)) + exp;
        while (e_shiplist[a].count <= 0 && e_count > 0) {
            l += 1;
            if (l > 20) {
                break;
            }
            a = Math.floor(Math.random() * (e_shiplist.length - exp)) + exp;
        }
        if (l > 20) {
            break;
        }
        l = 0;
        if (e_count <= 0) {
            loop = -100;
            continue;
        }
        else {
            e_shiplist[a].hull -= Math.round(p_damage / p_count);
            while (e_shiplist[a].hull <= 0 && l === 0) {
                e_shiplist[a].hull += data.ships[a].hull;
                e_shiplist[a].count -= 1;
                if (e_shiplist[a].count <= 0) {
                    l = 1;
                }
            }
        }
    }
    readout.html("<table style='margin:auto; text-align:center; width:40%'><tr><td>Your ships<td>Enemy ships</tr><tr>" + checkShipNumbers() + "</tr></table>");
    shipGetValues();
    if (e_hull <= 0) {
        current_location.faction = 0;
        for (i = 0; i < data.ships.length; i++) {
            e_shiplist[i].count = 0;
        }
        info.html("You are victorious! The planet is now under your control.");
        readout.html(text);
        event_log.push("You were victorious at " + current_location.name);
        btn1.show();
            btn1.off('click').on('click', function () {
                eventPlanet();
            });
            btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_def64 + ')"></div>Continue');
    } else if (p_hull <= 0) {
        for (i = 0; i < data.ships.length; i++) {
            p_shiplist[i].count = 0;
        }
        if (current_location.faction === 0) {
            info.html("You have lost this fight, and with it, half of your population. You retain ownership of the planet though, because that is not yet implemented.");
            current_location.population = Math.round(current_location.population/2);
            readout.html(text);
            event_log.push(current_location.name + " was attacked.");
            btn1.show();
            btn1.off('click').on('click', function () {
                eventPlanet();
            });
            btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_def64 + ')"></div>Back to base');
        } else {
            info.html("You have lost this fight. Derelict hulls of scrap metal float in orbit around " + current_location.name + ". Perhaps next time you will be more successful.");
            readout.html(text);
            event_log.push("Your army was destroyed at " + current_location.name);
            btn1.show();
            btn1.off('click').on('click', function () {
                current_location = planets[0];
                eventPlanet();
            });
            btn1.html('<div class="btn_icon" style="background-position:0px 0px; background-image:url(' + img_def64 + ')"></div>Back to base');
        }
        $("#menu_list_left").show();
    }
}
function checkShipNumbers() {
    var t = " ", i, p_numbers = [0, 0, 0, 0], e_numbers = [0, 0, 0, 0];
    p_numbers[0] = p_shiplist[exp].count;
    p_numbers[1] = p_shiplist[exp+1].count;
    p_numbers[2] = p_shiplist[exp+2].count;
    p_numbers[3] = p_shiplist[exp+3].count;

    e_numbers[0] = e_shiplist[exp].count;
    e_numbers[1] = e_shiplist[exp+1].count;
    e_numbers[2] = e_shiplist[exp+2].count;
    e_numbers[3] = e_shiplist[exp+3].count;

    t += "<td>Fighters: " + p_numbers[0] + "<br>Corvettes: " + p_numbers[1] + "<br>Frigates: " + p_numbers[2] + "<br>Cruisers: " + p_numbers[3];
    t += "<td>Fighters: " + e_numbers[0] + "<br>Corvettes: " + e_numbers[1] + "<br>Frigates: " + e_numbers[2] + "<br>Cruisers: " + e_numbers[3];
    return(t);
}
function getScienceResearched() {
    var i, sci = [];
    for (i = 0; i < data.science.length-1; i += 1) {
        sci.push(1);
        if (data.science[i+1].researched === true) {
            sci[i] += data.science[i].inc;
        }
    }
    return(sci);
}
function viewStats() {
    'use strict';
    var i, stat_income = 0, stat_population = 0, science_bonuses = getScienceResearched();
    for (i = 0; i < planets.length; i++){
        if (planets[i].faction === 0) {
            stat_income += Math.round(planets[i].income * science_bonuses[0]);
            stat_population += Math.round(planets[i].population);
        }
    }
    $("#menu_readout_top").html(current_location.name + ":");
    $("#menu_list_right").html("<li class='stats'>Income: " + numberWithCommas(Math.round(current_location.income * science_bonuses[0])) +
        "<li class='stats'>Population: " + numberWithCommas(current_location.population) +
        "<li class='text'>Resource production: " + current_location.production +
        "<li class='stats'>Resources: " + current_location.resources +
        "<li class='text'>Science output: " + current_location.science +
        "<li class='text'>Maximum repair value: " + current_location.repair);
        // Number of ships; Ship combined damage; Ship combined hull
    $("#menu_extended").show();
    $("#menu_extended").html("Your empire:");
    $("#menu_list_ext").show();
    $("#menu_list_ext").html("<li class='text'>Total income: " + numberWithCommas(stat_income) +
        " </li><li class='stats'>Money: " + numberWithCommas(stat_money) +
        " </li><li class='stats'>Total population: " + numberWithCommas(stat_population) +
        " </li><li class='text'>Science: " + stat_science +
        " </li><li class='text'>Total planets discovered: " + planets.length);
}
