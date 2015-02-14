function save() {return("");
	$.jStorage.set("ships", ships);
    $.jStorage.set("planets", planets);
    $.jStorage.set("s_money", stat_money);
    $.jStorage.set("s_pop", stat_population);
    $.jStorage.set("s_science", stat_science);
    //$.jStorage.set("s_p_s", stat_points_spent);
    //$.jStorage.set("equipped", equipped);
    //$.jStorage.set("upgrades", upgrades);
    console.log($.jStorage.get("ships"));
    console.log($.jStorage.get("s_money"));
    console.log($.jStorage.get("s_exp"));
    console.log($.jStorage.get("s_lvl"));
    console.log($.jStorage.get("equipped"));
    console.log($.jStorage.get("upgrades"));
    info.html("Progress has been saved!");
}
function load() {return("");
    var i;
    if (typeof $.jStorage.get("ships")[0] === "object") {
        for(i = 0; i < $.jStorage.get("ships").length; i += 1) {
            ships[i] = $.jStorage.get("ships")[i];
            ships[i].count = $.jStorage.get("ships")[i].count;
        }
        console.log = ships;
    }
    stat_money = $.jStorage.get("s_money");
    stat_population = $.jStorage.get("s_pop");
    stat_level = $.jStorage.get("s_lvl");
    stat_points_spent = $.jStorage.get("s_p_s");
}
function reset(t, r) {return("");
    if (t === "nodialog" || confirm("Reset all progress? This cannot be undone.") === true) {
        $.jStorage.flush();
        ships = [];
        var newitem = {};
        newitem.listy = -128; newitem.type = "Consumable"; newitem.itemid = "c2"; newitem.listx = -32; newitem.heal = 10; newitem.money = 5; newitem.name = "Health Vial";	newitem.desc = "A glass vial containing some sort of red healing liquid";
        newitem.count = 2;
        ships.push(newitem);
        ships.push(shop_list[4]);
        ships[1].count = 1;
        stat_money = 5;
        stat_level = 1;
        stat_experience = 0;
        stat_next_level = stat_level * 100;
        stats = [0, 0, 0, 0];
        equipped = ["00", "none", "none", "none"];
        eventTown();
        viewStats();
        viewMenu("ships");
        if (r === true) {
            location.reload();
        }
    }
}
