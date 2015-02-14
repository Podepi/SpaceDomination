function initScience() {
    var i;
    for (i = 0; i < data.science.length; i += 1) {
        var new_upg = {};
        new_upg.count = 0;
        new_upg.max_points = data.science[i].max_points;
        upgrades.push(new_upg);
    }
}
function updateScience() {
    'use strict';
    var iconx, icony, a, t = " ";
    $("#list_heading").html("Science projects - (You have " + numberWithCommas(stat_science) + " science points)");
    for (a = 0; a < data.science.length; a += 1) {
        if (data.science[a].researched == false && data.science[data.science[a].req].researched == true) {
            iconx = data.science[a].x;
            icony = data.science[a].y;
            t += "<li style='cursor:pointer' id='" + a + "' class='inv'> <div class='inv_icon' style='background-position:" + iconx + "px " + icony +
                "px'></div><p class='invlist'>" + data.science[a].name;
        }
    }
    $("#menu_list_left").html(t);

    //Mouseover stats
    $("li.inv").hover(
        function () {
            $(this).css("background-color", "#DDD");
            var sci = data.science[this.id];
            viewScience(sci);
        },
        function () {
            $(this).css("background-color", "#FFF");
            viewStats();
        }
    );
    $("li.inv").off("click").on("click",
        function () {
            var sci = data.science[this.id], info = $("#this.id").html();
            if (stat_science >= sci.cost) {
                event_log.push("You researched " + data.science[this.id].name);
                stat_science -= sci.cost;
                sci.researched = true;
            } else {setInfo("You need more science points!")}
            updateScience();
        });
}
function viewScience(l) {
    var list_text;
	$("#menu_readout_top").html(l.desc);
	list_text = "<li class='stats'><div class='inv_icon' style='background-position:-224px 0px'></div>: " + l.cost + " science required</li>";
	$("#menu_list_right").html(list_text);
    $("#menu_extended").hide();
    $("#menu_list_ext").hide();
}
function shipGetValues() {
    var i, sci = data.science;
    for (i = 0; i < p_shiplist.length; i += 1) {
        p_shiplist[i].cost = data.ships[i].cost;
        p_shiplist[i].damage = data.ships[i].damage;
        p_shiplist[i].hull = data.ships[i].hull;
        p_shiplist[i].crew = data.ships[i].crew;
    }
    if (sci[5].researched == true) {data.ships[exp].available = true}
    if (sci[6].researched == true) {data.ships[exp+1].available = true}
    if (sci[7].researched == true) {data.ships[exp+2].available = true}
    if (sci[8].researched == true) {data.ships[exp+3].available = true}
    if (sci[9].researched == true) {
        p_shiplist[exp].hull += sci[9].inc;
    } if (sci[12].researched == true) {
        p_shiplist[exp].damage += sci[12].inc;
    }
    if (sci[10].researched == true) {
        p_shiplist[exp + 1].hull += sci[10].inc;
    } if (sci[13].researched == true) {
        p_shiplist[exp + 1].damage += sci[13].inc;
    }
    if (sci[11].researched == true) {
        p_shiplist[exp + 2].hull += sci[11].inc;
    } if (sci[14].researched == true) {
        p_shiplist[exp + 2].damage += sci[14].inc;
    }
}