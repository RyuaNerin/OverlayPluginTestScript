var jobs = {
    //"검술사": "Gld",
    "나이트": "Pld",
    //"도끼술사": "Mrd",
    "전사": "War",
    "암흑기사": "Drk",

    //"격투가": "Pgl",
    "몽크": "Mnk",
    //"창술사": "Lnc",
    "용기사": "Drg",
    //"궁술사": "Arc",
    "음유시인": "Brd",
    //"쌍검사": "Rog",
    "닌자": "Nin",
    "비술사": "Acn",
    "비술사-카벙클": "Acn",
    "비술사-토파즈": "Acn",
    "소환사": "Smn",
    "소환사-가루다": "Smn",
    "소환사-타이탄": "Smn",
    "소환사-이프리트": "Smn",
    //"주술사": "Thm",
    "흑마도사": "Blm",
    "기공사": "Mch",
    "기공사-룩": "Mch",
    "기공사-비숍": "Mch",

    //"환술사": "Cnj",
    "백마도사": "Whm",
    "학자": "Sch",
    "학자-에오스": "Sch",
    "학자-셀레네": "Sch",
    "점성술사": "Ast",

    "리미트 브레이크": "",

    "목수": "Crp",

    "목수-초코보": "Crp",

    "초코보 (목수)": "",

    "요정 에오스 (학자-에오스)": "",
    "요정 셀레네 (학자-셀레네)": "",

    "카벙클 에메랄드 (비술사-카벙클)": "",
    "토파즈 에메랄드 (비술사-토파즈)": "",

    "가루다 에기 (소환사-가루다)": "",
    "타이탄 에기 (소환사-타이탄)": "",
    "이프리트 에기 (소환사-이프리트)": "",

    "자동포탑 룩 (기공사-룩)": "",
    "자동포탑 룩 (기공사-비숍)": "",

}

var duration = Math.floor((Math.random() * 300) + 100);

var rd = 0;
var rh = 0;

var combatants = {};
for (var name in jobs) {
    var combatant = {};
    combatants[name] = combatant;

    combatant["name"] = name;
    combatant["Job"] = jobs[name];
    rd += (combatant["damage"] = Math.floor((Math.random() * 1000000) + 100));
    combatant["tohit"] = Math.floor((Math.random() * 2000) + 1);
    combatant["swings"] = Math.floor((Math.random() * 2000) + 1);
    combatant["misses"] = Math.floor((Math.random() * 1000) + 1);
    combatant["hitfailed"] = Math.floor((Math.random() * 1000) + 1);
    combatant["crithit"] = Math.floor((Math.random() * combatant["swings"]) + 1);
    combatant["crithit%"] = Math.round(combatant["crithit"] / combatant["swings"] * 100) + "%";
    combatant["damagetaken"] = Math.floor((Math.random() * 1000) + 1);
    combatant["healstaken"] = Math.floor((Math.random() * 1000) + 1);
    combatant["ParryPct"] = Math.floor((Math.random() * 100) + 1) + "%";
    combatant["BlockPct"] = Math.floor((Math.random() * 100) + 1) + "%";
    rh += (combatant["healed"] = Math.floor((Math.random() * 1000000) + 100));
    combatant["OverHealPct"] = Math.floor((Math.random() * 100) + 1) + "%";
    combatant["heals"] = Math.floor((Math.random() * 100) + 100);
    combatant["critheal%"] = Math.floor((Math.random() * 100) + 1) + "%";
    combatant["powerdrain"] = Math.floor((Math.random() * 1000000) + 100);
    combatant["powerheal"] = Math.floor((Math.random() * 1000000) + 100);
    combatant["cures"] = Math.floor(Math.random() * 100);
    combatant["deaths"] = Math.floor(Math.random() * 5);
}
for (var name in combatants) {
    var combatant = combatants[name];
    combatant["encdps"] = Math.round(combatant["damage"] / duration * 10) / 10;
    combatant["damage%"] = Math.round(combatant["damage"] / rd * 100) + "%";
    combatant["healed%"] = Math.round(combatant["healed"] / rh * 100) + "%";
}

var sortedCombatants   = {};
var sortedCombatantKey = Object.keys(combatants).sort(function(a, b) { return combatants[b]["encdps"] - combatants[a]["encdps"]; });
for (var i = 0; i < sortedCombatantKey.length; ++i) {
    sortedCombatants[sortedCombatantKey[i]] = combatants[sortedCombatantKey[i]];
}

var encounter = {};
encounter["duration"] = (duration < 600 ? "0" : "") + Math.floor(duration / 60) + ":" + (duration % 60 < 10 ? "0" : "") + Math.floor(duration % 60);
encounter["title"]    = "Test Combatant";
encounter["dps"]      = Math.round(rd / duration * 10) / 10;

var data = {};
data["isActive"] = true;
data["Encounter"] = encounter;
data["Combatant"] = sortedCombatants;

document.dispatchEvent(new CustomEvent( "onOverlayDataUpdate", { detail: data } ));
