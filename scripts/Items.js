function updateShips() {
    'use strict';
    shipGetValues();
    var iconx, icony, a, t = " ";
    $("#list_heading").html("Spaceships - (You have $" + numberWithCommas(stat_money) + "</span>)");
    for (a = 0; a < data.ships.length; a += 1) {
        if (data.ships[a].available === false) {continue;}
        if (show_exploration == false && data.ships[a].type == "Exploration") {continue;}
        if (show_military == false && data.ships[a].type == "Military") {continue;}
        iconx = data.ships[a].x;
        icony = data.ships[a].y;

        t += "<li id='"+a+"' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony + "px'></div><p class='invlist'>" + data.ships[a].name + " (" + p_shiplist[a].count + ")" + "<button style='float:right' onclick='sellShip("+a+")'>Sell</button>" + "<button style='float:right' onclick='buyShip("+a+")'>Buy</button>";
    }
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
        function () {
            $(this).css("background-color", "#DDD");
            viewShip(this.id);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
}
function viewShip(ship) {
    'use strict';
    var list_text;
    $("#menu_readout_top").html(data.ships[ship].description);
    list_text = "<li class='stats'><b>" + data.ships[ship].type + "</b></li><li class='stats'><div class='inv_icon' style='background-position:0px 0px'></div>: " + numberWithCommas(p_shiplist[ship].cost) + " to buy</li>";
    list_text += "<li class='stats'><div class='inv_icon' style='background-position:-32px 0px'></div>: " + p_shiplist[ship].damage + " damage</li>";
    list_text += "<li class='stats'><div class='inv_icon' style='background-position:-64px 0px'></div>: " + p_shiplist[ship].hull + " hull</li>";
    list_text += "<li class='stats'><div class='inv_icon' style='background-position:-96px 0px'></div>: " + numberWithCommas(p_shiplist[ship].crew) + " crew</li>";
    $("#menu_list_right").html(list_text);
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function createShip(ship) {
    var new_ship = {};
    new_ship.name = ship.name;
    new_ship.type = ship.type;
    new_ship.cost = ship.cost;
    new_ship.damage = ship.damage;
    new_ship.hull = ship.hull;
    new_ship.crew = ship.crew;
    new_ship.count = 0;
    return (new_ship);
}
function buyShip(ship) {
    var i;
    if (current_location.faction !== 0) {setInfo("You need to take control of this planet in order to construct ships here!"); return(" ");}
    for (i = 0; i < ships_to_buy; i += 1) {
        if (data.ships[ship].cost <= stat_money && data.ships[ship].crew <= current_location.population) {
            p_shiplist[ship].count += 1;
            current_location.population -= data.ships[ship].crew;
            stat_money -= data.ships[ship].cost;
            ships_bought += 1;
        } else {
            i = ships_to_buy;
            var t = "You do not have enough ";
            if (data.ships[ship].crew >= current_location.population)
            {
                t += "crew";
                if (data.ships[ship].cost >= stat_money) {
                    t += " and money";
                }
            } else if (data.ships[ship].cost >= stat_money) {
                t += "money";
            }
            t += " to construct this ship.";
            setInfo(t);
        }
    }
    updateShips();
}
function sellShip(ship) {
    if (current_location.faction !== 0) {setInfo("You need to take control of this planet in order to deconstruct ships here!"); return(" ");}
    for (i = 0; i < ships_to_buy; i += 1) {
        if (p_shiplist[ship].count > 0) {
            p_shiplist[ship].count -= 1;
            current_location.population += data.ships[ship].crew;
            stat_money += data.ships[ship].cost/2;
            ships_sold += 1;
        } else {i = ships_to_buy}
    }
    updateShips();
}