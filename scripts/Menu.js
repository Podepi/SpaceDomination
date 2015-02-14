function viewMenu(screen) {
    'use strict';
    viewStats();
    current_screen = screen;
    switch (screen) {
        case "ships":
            updateShips();
            $(".menuheading").html("Build spaceships to dominate the universe!");
            $("#list_sort").html("<button id='buy_more'>Buy/sell x" + ships_to_buy + "</button>" +
                             '<li id="sort_desc" style="font-size:8pt">Sort spaceships by type:</li>' +
                             '<li id="sort_exp" class="sort inv_icon" style="background-position:-32px 0px"></li>' +
                             '<li id="sort_mil" class="sort inv_icon" style="background-position:-64px 0px"></li><br>');
            $("#buy_more").on("click",
                function() {
                    if (ships_to_buy === 1) {
                        ships_to_buy = 10;
                    }
                    else if (ships_to_buy === 10) {
                        ships_to_buy = 100;
                    }
                    else if (ships_to_buy === 100) {
                        ships_to_buy = 1000;
                    }
                    else {
                        ships_to_buy = 1;
                    }
                    $("#buy_more").html("Buy/sell x" + ships_to_buy);
                });
            $("li.sort").hover(
                function () {
                    $(this).css("border-color", "#000");
                }, function () {
                    $(this).css("border-color", "#FFF");
                }
                ); $("#sort_exp").hover(
                    function () {
                        $("#sort_desc").html("Show/hide exploration ships");
                    }, function () {
                        $("#sort_desc").html("Sort spaceships by type:");
                    }
                ); $("#sort_exp").on("click",
                     function () {
                        if (show_exploration === true) {
                            show_exploration = false;
                            $(this).css("opacity", "0.3");
                        } else {
                            show_exploration = true;
                            $(this).css("opacity", "1");
                        }
                        updateShips();
                    }
                ); $("#sort_mil").hover(
                    function () {
                        $("#sort_desc").html("Show/hide military ships");
                    }, function () {
                        $("#sort_desc").html("Sort spaceships by type:");
                    }
                ); $("#sort_mil").on("click",
                     function () {
                        if (show_military === true) {
                            show_military = false;
                            $(this).css("opacity", "0.3");
                        } else {
                            show_military = true;
                            $(this).css("opacity", "1");
                        }
                        updateShips();
                    }
                );
            break;
        case "planets":
            updateLocations();
            $(".menuheading").html("Search for potential victims!");
            $("#list_heading").html("Planets <i>(Click to visit planet)</i>");
            $("#list_sort").html('<li id="sort_desc" style="font-size:8pt">Sort planets by faction:</li>' +
                             '<li id="sort_empire" class="sort inv_icon" style="background-position:-32px 0px"></li>' +
                             '<li id="sort_enemy" class="sort inv_icon" style="background-position:-64px 0px"></li>' +
                             '<li id="sort_uninhabited" class="sort inv_icon" style="background-position:-32px -32px"></li><br>');
            $("li.sort").hover(
                function () {
                    $(this).css("border-color", "#000");
                }, function () {
                    $(this).css("border-color", "#FFF");
                }
                ); $("#sort_empire").hover(
                    function () {
                        $("#sort_desc").html("Show/hide your planets");
                    }, function () {
                        $("#sort_desc").html("Sort planets by faction:");
                    }
                ); $("#sort_empire").on("click",
                     function () {
                        if (show_planet[0] === true) {
                            show_planet[0] = false;
                            $(this).css("opacity", "0.3");
                        } else {
                            show_planet[0] = true;
                            $(this).css("opacity", "1");
                        }
                        updateLocations();
                    }
                ); $("#sort_enemy").hover(
                    function () {
                        $("#sort_desc").html("Show/hide enemy planets");
                    }, function () {
                        $("#sort_desc").html("Sort planets by faction:");
                    }
                ); $("#sort_enemy").on("click",
                     function () {
                        if (show_planet[1] === true) {
                            show_planet[1] = false;
                            $(this).css("opacity", "0.3");
                        } else {
                            show_planet[1] = true;
                            $(this).css("opacity", "1");
                        }
                        updateLocations();
                    }
                ); $("#sort_uninhabited").hover(
                    function () {
                        $("#sort_desc").html("Show/hide uninhabited planets");
                    }, function () {
                        $("#sort_desc").html("Sort planets by faction:");
                    }
                ); $("#sort_uninhabited").on("click",
                     function () {
                        if (show_planet[2] === true) {
                            show_planet[2] = false;
                            $(this).css("opacity", "0.3");
                        } else {
                            show_planet[2] = true;
                            $(this).css("opacity", "1");
                        }
                        updateLocations();
                    }
                );
            break;
        case "buildings":
            updateBuildings();
            $(".menuheading").html("Build structures to further your cause!");
            $("#list_heading").html("Buildings - (You have $" + numberWithCommas(stat_money) + ")");
            $("#list_sort").html(" ");
            break;
        case "science":
            updateScience();
            $(".menuheading").html("Research new and deadly technologies to assist galactic domination!");
            $("#list_heading").html("Science projects - (You have " + numberWithCommas(stat_science) + " science points)");
            $("#list_sort").html(" ");
            break;
        case "encyclopedia":
            updateTopics();
            $(".menuheading").html("Read the book about (not quite) everything!");
            $("#list_heading").html("Topics <i>(Click to read)</i>");
            $("#list_sort").html(" ");
    }
}
function findPlanetType(p, new_planet) {
    var i;
    for (i = 0; i < l_location.length-1; i+=1) {
        type = l_location[i].split(":");
        if (p.population <= parseInt(type[2])) {
            if(p.type != type[0] && new_planet !== true) {event_log.push(p.name + " has become a/an " + type[0].toLowerCase())}
            p.type = type[0];
            p.description = type[1];
            p.landing = type[3];
            return(p);
        }
    }
    if (p.population === 0) {
        faction = 3;
    }
    type = l_location[6].split(":");
    p.type = type[0];
    p.description = type[1];
    p.landing = type[3];
    return(p);
}
function createPlanet() {
    new_planet = {};
    type = l_location[Math.floor(Math.random()*l_location.length)].split(":");
    new_planet.name = createName();
    //new_planet.map_x = Math.floor((Math.random() * 1000) - 500); new_planet.map_y = Math.floor((Math.random() * 1000) - 500);
    new_planet.population = Math.round(Math.random() * type[2]);
    new_planet.habitability = Math.round(Math.random() * 50) + 20;
    if (new_planet.population == 0) {
        new_planet.faction = 2;
    } else {
        new_planet.faction = 1;
    }
    new_planet.image = Math.floor(Math.random() * 7);
    new_planet.buildings = [1, 1, 1];
    new_planet.resources = 0;
    new_planet.production = Math.round(Math.random() * 200) + 30;
    new_planet.income = Math.round(1.2 * Math.sqrt(new_planet.population));
    new_planet = findPlanetType(new_planet, true);
    planets.push(new_planet);
    planets_discovered += 1;
    viewMenu(current_screen);
}
function initLocations() {
    'use strict';
    var new_planet = {};
    new_planet.name = createName();
    //new_planet.map_x = 0; new_planet.map_y = 0;
    new_planet.population = 4000000000;
    new_planet.habitability = 100;
    new_planet.faction = 0;
    new_planet.image = Math.floor(Math.random() * 6);
    new_planet.buildings = [1, 1, 1];
    new_planet.resources = 500;
    new_planet.production = 150;
    new_planet.income = Math.round(1.2 * Math.sqrt(new_planet.population));
    new_planet.ships = [];
    new_planet = findPlanetType(new_planet, true);
    planets.push(new_planet);
    current_location = planets[0];
}
function updateLocations() {
	'use strict';
    var iconx, icony = -288, i, a, t = " ";
	for (a = 0; a < planets.length; a += 1) {
        planet_search:
        for (i = 0; i < show_planet.length; i += 1) {
            if (show_planet[i] == false && planets[a].faction == i) {continue planet_search;}
        }
        planets[a].income = Math.round(1.2 * Math.sqrt(planets[a].population));
		iconx = planets[a].image * -32;
		t += "<li style='cursor:pointer' id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px -32px'><div class='inv_icon' style='background-position:" + planets[a].faction*-32 + "px -64px'></div></div><p class='invlist'>" + planets[a].name;
		t += "</li>";
	}
    t += "<li style='cursor:pointer' id='explore' class='inv'> <div class='inv_icon' style='background-position:0px -224px'></div><p class='invlist'>Search for planet<br><span style='font-size:10pt'>(Requires 1 probe)</li>";
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
		function () {
            $(this).css("background-color", "#DDD");
            viewLocation(planets[this.id]);
        },
        function () {
            $(this).css("background-color", "transparent");
            viewStats();
        }
    );
    $("li.inv").off("click").on("click",
        function () {
            if (this.id === 'explore') {
                if (p_shiplist[0].count >= 1) {
                    p_shiplist[0].count -= 1;
                    createPlanet();
                } else {
                    setInfo("A space probe is required to search for planets.");
                }
                return("");
            }
            travelToPlanet(this.id);
            if (menuscreen === "locations") {
                updateLocations();
            }
            eventShop("hide");
        });
}
function updateLocationsTest() {
    createPrompt("planet_map");
}
function viewLocation(l) {
	var list_text, faction = "Enemy faction";
    if (l === undefined) {list_text = "Send a probe to a nearby star system in search of a planet to conquer.";
                          $("#menu_readout_top").text(list_text);
                          $("#menu_list_right").html(" ");
                          $("#menu_extended").hide();
                          $("#menu_list_ext").hide();
                          return("");}
    if (l.faction === 0) {faction = "Your empire"}
        else if (l.population === 0) {faction = "None"}
	$("#menu_readout_top").html(l.description);
	list_text = "<li class='stats'><b>" + l.type + "</b></li><li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + numberWithCommas(l.population) +
    " population</li><li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + l.habitability +
    "% habitability</li><li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + faction +
    "</li><li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + numberWithCommas(l.production) +
    " resource production</li><li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + numberWithCommas(l.income) +
    " income</li>";
	$("#menu_list_right").html(list_text);
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function updateBuildings() {
    'use strict';
    var iconx = 0, icony = -288, a, t = " ";
    for (a = 0; a < data.buildings.length; a += 1) {
        iconx = 0;
        t += "<li style='cursor:pointer' id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" +
                data.buildings[a].name + '<br><span style="font-size:10pt">Level '+current_location.buildings[a]+"</span>";
        t += "</li>";
    }
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
        function () {
            $(this).css("background-color", "#DDD");
            viewBuilding(this.id);
        },
        function () {
            $(this).css("background-color", "transparent");
            viewStats();
        }
    );
    $("li.inv").off("click").on("click",
        function () {
            var cost = buildingUpgradeCost(this.id);
            if (stat_money >= cost) {
                current_location.buildings[this.id].lvl += 1;
                stat_money -= cost;
                updateBuildings();
            } else {setInfo("You do not have enough money to upgrade this building!")}
        });
}
function viewBuilding(b) {
    var list_text;
    var cost = buildingUpgradeCost(b);
    $("#menu_readout_top").text(data.buildings[b].description);
    list_text = "<li class='stats'><div class='inv_icon' style='background-position:0px 0px'></div>: " + numberWithCommas(cost) + " to upgrade</li>";
    $("#menu_list_right").html(list_text);
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function buildingUpgradeCost(l) {
    return(data.buildings[l].base_cost + (data.buildings[l].cost_factor * current_location.buildings[l]));
}
function createPrompt(pt) {
    switch (pt) {
        case "planet_map":
            var popup_heading = "Galactic Planet Map", popup_info;
            canvas_play = true;
            popup_info = "<canvas id='starmap' width='" + 400 + "' height='" + 400 + "'>"
            $("#megadiv").append("<div class='overlay'><div class='popup img_border_grey'><div class='headerdiv'>" + popup_heading + "<div class='close'></div></div>" + popup_info + "</div></div>");
            $(".close").on("click", function() {
                closePrompt();
            });
            updateCanvas();
            break;
        default:
            $("#megadiv").append("<div class='overlay'><div class='popup img_border_grey starfield'><div class='headerdiv'>" + popup_heading + "<div class='close'></div></div>" + popup_info + "</div></div>");
            $(".close").on("click", function() {
                closePrompt();
            });
    }
}
function closePrompt() {
    $(".overlay").remove();
    canvas_play = false;
}
function changeBackground(c) {
    switch (c) {
        case "day":
            $("body").css("background-color","#fff");
            $("footer").find("p").css( "color", "#000");
            break;
        case "night":
            $("body").css("background-color","#000");
            $("footer").find("p").css( "color", "#fff");
            break;
    }
}
