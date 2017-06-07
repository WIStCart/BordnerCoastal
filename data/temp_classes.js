var tempClasses = {
  "AP": { "level1":"Agriculture", "level1frq":40674, "hex1":"#D98880", "level2":"Abandoned Pasture", "level2frq":4},
  "BB": { "level1":"Agriculture", "level1frq":40674, "hex1":"#C39BD3", "level2":"Blueberry", "level2frq":19},
  "C": { "level1":"Agriculture", "level1frq":40674, "hex1":"#7FB3D5", "level2":"Cleared Cropland", "level2frq":21011},
  "CS": { "level1":"Agriculture", "level1frq":40674, "hex1":"#5DADE2", "level2":"Cultivated Stump Land", "level2frq":92},
  "F4": { "level1":"Agriculture", "level1frq":40674, "hex1":"#76D7C4", "level2":"Cranberry Marsh", "level2frq":11},
  "FP": { "level1":"Agriculture", "level1frq":40674, "hex1":"#7DCEA0", "level2":"Forest Plantation", "level2frq":5},
  "P": { "level1":"Agriculture", "level1frq":40674, "hex1":"#F1C40F", "level2":"Pasture", "level2frq":8646},
  "PP": { "level1":"Agriculture", "level1frq":40674, "hex1":"#FDEBD0", "level2":"Permanent Pasture", "level2frq":3010},
  "SP": { "level1":"Agriculture", "level1frq":40674, "hex1":"#873600", "level2":"Stump Pasture", "level2frq":6091},
  "OR": { "level1":"Agriculture", "level1frq":40674, "hex1":"#D6DBDF", "level2":"Orchard", "level2frq":1785},
  "CL": { "level1":"Barren", "level1frq":3987, "hex1":"#7FB3D5", "level2":"Clay Pit", "level2frq":5},
  "GP": { "level1":"Barren", "level1frq":3987, "hex1":"#C39BD3", "level2":"Gravel Pit", "level2frq":69},
  "MF": { "level1":"Barren", "level1frq":3987, "hex1":"#7FB3D5", "level2":"Mud Flats", "level2frq":29},
  "RO": { "level1":"Barren", "level1frq":3987, "hex1":"#5DADE2", "level2":"Rock Outcrop", "level2frq":77},
  "A": { "level1":"Barren", "level1frq":3987, "hex1":"#76D7C4", "level2":"Abandoned", "level2frq":602},
  "CPP": { "level1":"Barren", "level1frq":3987, "hex1":"#7DCEA0", "level2":"Poor Land Previously Cropped", "level2frq":188},
  "O": { "level1":"Barren", "level1frq":3987, "hex1":"#F1C40F", "level2":"Open", "level2frq":3017},
  "B2": { "level1":"Conniferous Forest", "level1frq":15827, "hex1":"#7DCEA0", "level2":"White Pine", "level2frq":1121},
  "B3": { "level1":"Conniferous Forest", "level1frq":15827, "hex1":"#C39BD3", "level2":"White Cedar", "level2frq":4905},
  "C2": { "level1":"Conniferous Forest", "level1frq":15827, "hex1":"#7FB3D5", "level2":"Norway Pine", "level2frq":530},
  "C3": { "level1":"Conniferous Forest", "level1frq":15827, "hex1":"#5DADE2", "level2":"Tamarack", "level2frq":1242},
  "D2": { "level1":"Conniferous Forest", "level1frq":15827, "hex1":"#76D7C4", "level2":"Jack Pine", "level2frq":2756},
  "D3": { "level1":"Conniferous Forest", "level1frq":15827, "hex1":"#7DCEA0", "level2":"Black Spruce", "level2frq":5273},
  "A1": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#F1C40F", "level2":"Upland Hardwoods", "level2frq":8655},
  "A2": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#C39BD3", "level2":"Hemlock with Hardwood", "level2frq":932},
  "B": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#7FB3D5", "level2":"Birch", "level2frq":119},
  "C1": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#5DADE2", "level2":"Popple with White Birch", "level2frq":19746},
  "C1b": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#76D7C4", "level2":"Inferior C1", "level2frq":847},
  "D": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#7DCEA0", "level2":"Scrub Oak", "level2frq":1256},
  "D1": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#F1C40F", "level2":"Oak - Hickory", "level2frq":1980},
  "D1b": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#FDEBD0", "level2":"Inferior D1", "level2frq":4},
  "D1u": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#873600", "level2":"Good Quality with White Oak", "level2frq":412},
  "D1uu": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#D6DBDF", "level2":"Medium Gr. Mostly Red Oak", "level2frq":120},
  "D3b": { "level1":"Deciduous Forest", "level1frq":34666, "hex1":"#2C3E50", "level2":"Balsam", "level2frq":595},
  "B1": { "level1":"Mixed Forest", "level1frq":11697, "hex1":"#fbb03b", "level2":"Hardwood with Conifers", "level2frq":8792},
  "B1b": { "level1":"Mixed Forest", "level1frq":11697, "hex1":"#C39BD3", "level2":"Inferior B1", "level2frq":214},
  "UF": { "level1":"Mixed Forest", "level1frq":11697, "hex1":"#7FB3D5", "level2":"Unknown Forest", "level2frq":2691},
  "BD": { "level1":"Other", "level1frq":1470, "hex1":"#9677b5", "level2":"Beaver Dam", "level2frq":1},
  "BF": { "level1":"Other", "level1frq":1470, "hex1":"#C39BD3", "level2":"Beaver Flowage", "level2frq":9},
  "BP": { "level1":"Other", "level1frq":1470, "hex1":"#7FB3D5", "level2":"Beaver Pond", "level2frq":22},
  "IS": { "level1":"Other", "level1frq":1470, "hex1":"#5DADE2", "level2":"Island", "level2frq":85},
  "D5": { "level1":"Other", "level1frq":1470, "hex1":"#76D7C4", "level2":"Recent Burn", "level2frq":700},
  "D5b": { "level1":"Other", "level1frq":1470, "hex1":"#7DCEA0", "level2":"Dead Timber", "level2frq":19},
  "S": { "level1":"Other", "level1frq":1470, "hex1":"#F1C40F", "level2":"Stump", "level2frq":607},
  "Blowdown": { "level1":"Other", "level1frq":1470, "hex1":"#9677b5", "level2":"Blowdown", "level2frq":1},
  "Cutover": { "level1":"Other", "level1frq":1470, "hex1":"#873600", "level2":"Cutover", "level2frq":7},
  "Cutover": { "level1":"Other", "level1frq":1470, "hex1":"#873600", "level2":"Cutover", "level2frq":7},
  "Rcnt_Cut": { "level1":"Other", "level1frq":1470, "hex1":"#D6DBDF", "level2":"Recent Cut", "level2frq":3},
  "Slash": { "level1":"Other", "level1frq":1470, "hex1":"#2C3E50", "level2":"Slash", "level2frq":16},
  "D4": { "level1":"Shrubland", "level1frq":3092, "hex1":"#C39BD3", "level2":"Leather Leaf", "level2frq":1427},
  "E1": { "level1":"Shrubland", "level1frq":3092, "hex1":"#D98880", "level2":"Pin Cherry", "level2frq":458},
  "E4": { "level1":"Shrubland", "level1frq":3092, "hex1":"#7FB3D5", "level2":"Weedy Peat", "level2frq":52},
  "UG": { "level1":"Shrubland", "level1frq":3092, "hex1":"#5DADE2", "level2":"Unknown Grassland", "level2frq":1155},
  "A5": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#D98880", "level2":"A5 -", "level2frq":3},
  "AA": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#C39BD3", "level2":"AA -", "level2frq":1},
  "AC": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#7FB3D5", "level2":"AC -", "level2frq":18},
  "AR": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#5DADE2", "level2":"AR -", "level2frq":2},
  "CCC": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#76D7C4", "level2":"CCC -", "level2frq":2},
  "CP": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#7DCEA0", "level2":"CP -", "level2frq":2},
  "D3u": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#F1C40F", "level2":"D3u -", "level2frq":1},
  "E2": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#FDEBD0", "level2":"E2 -", "level2frq":1},
  "F": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#873600", "level2":"F -", "level2frq":20},
  "OA": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#D6DBDF", "level2":"OA -", "level2frq":3},
  "OC": { "level1":"Unknown Cover", "level1frq":55, "hex1":"#2C3E50", "level2":"OC -", "level2frq":2},
  "ARPT": { "level1":"Urban", "level1frq":975, "hex1":"#5DADE2", "level2":"Airport", "level2frq":2},
  "CM": { "level1":"Urban", "level1frq":975, "hex1":"#C39BD3", "level2":"Cemetery", "level2frq":232},
  "CT": { "level1":"Urban", "level1frq":975, "hex1":"#7FB3D5", "level2":"City", "level2frq":615},
  "FF": { "level1":"Urban", "level1frq":975, "hex1":"#5DADE2", "level2":"Fur Farm", "level2frq":25},
  "FG": { "level1":"Urban", "level1frq":975, "hex1":"#76D7C4", "level2":"Fair Grounds", "level2frq":1},
  "FX": { "level1":"Urban", "level1frq":975, "hex1":"#7DCEA0", "level2":"Fox Farm", "level2frq":2},
  "GC": { "level1":"Urban", "level1frq":975, "hex1":"#F1C40F", "level2":"Golf Course", "level2frq":44},
  "MY": { "level1":"Urban", "level1frq":975, "hex1":"#FDEBD0", "level2":"Mill Yard", "level2frq":1},
  "Qz": { "level1":"Urban", "level1frq":975, "hex1":"#873600", "level2":"Quarry", "level2frq":13},
  "CA": { "level1":"Urban", "level1frq":975, "hex1":"#D6DBDF", "level2":"Camp", "level2frq":13},
  "PD": { "level1":"Urban", "level1frq":975, "hex1":"#2C3E50", "level2":"Public Dump", "level2frq":20},
  "U": { "level1":"Urban", "level1frq":975, "hex1":"#641E16", "level2":"U -", "level2frq":7},
  "A3": { "level1":"Wetlands", "level1frq":23038, "hex1":"#ccc", "level2":"Swamp Hardwoods", "level2frq":9504},
  "A4": { "level1":"Wetlands", "level1frq":23038, "hex1":"#223b53", "level2":"Tagalder - Willow Dogwood Etc.", "level2frq":7808},
  "B4": { "level1":"Wetlands", "level1frq":23038, "hex1":"#e55e5e", "level2":"Cat Tail Marsh", "level2frq":261},
  "C4": { "level1":"Wetlands", "level1frq":23038, "hex1":"#3bb2d0", "level2":"Grass Marsh", "level2frq":4267},
  "C4b": { "level1":"Wetlands", "level1frq":23038, "hex1":"#ccc", "level2":"Sedge Marsh", "level2frq":1198}
}

var tempClasses2 = {
classes:[{"code":"C","name":"C - Cleared Cropland","level2":"Cleared cropland","level1":"Agriculture","color1":"#ce491c","color2":"#b94119"},
{"code":"CS","name":"CS - Cultivated Stump Land","level2":"Cultivated stump land","level1":"Agriculture","color1":"#ce491c","color2":"#a43a16"},
{"code":"NURSERY","name":"NURSERY","level2":"Nursery","level1":"Agriculture","color1":"#ce491c","color2":"#903313"},
{"code":"Nursey","name":"Nursey","level2":"Nursery","level1":"Agriculture","color1":"#ce491c","color2":"#903313"},
{"code":"OR","name":"OR - Orchard","level2":"Orchard","level1":"Agriculture","color1":"#ce491c","color2":"#7b2b10"},
{"code":"FX","name":"FX - Fox Farm","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"BB","name":"BB - Blueberry","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"FF","name":"FF - Fur Farm","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"FP","name":"FP - Forest Plantation","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"BEE FARM","name":"BEE FARM","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"County Farm","name":"County Farm","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"STATE FARM","name":"STATE FARM","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"STKYD","name":"Stock Yard?","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"PRX","name":"PRX -","level2":"Other agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#d25b32"},
{"code":"P","name":"P - Pasture","level2":"Pasture","level1":"Agriculture","color1":"#ce491c","color2":"#d76d49"},
{"code":"PP","name":"PP - Permanent Pasture","level2":"Permanent pasture","level1":"Agriculture","color1":"#ce491c","color2":"#dc7f60"},
{"code":"SP","name":"SP - Stump Pasture","level2":"Stump pasture","level1":"Agriculture","color1":"#ce491c","color2":"#e19176"},
{"code":"OA","name":"OA -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"OC","name":"OC -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CCC","name":"CCC -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"AR","name":"AR -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"AC","name":"AC -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CP","name":"CP -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"ARX","name":"ARX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CRS","name":"CRS-","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPRZ","name":"CPPRZ -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PPRX","name":"PPRX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PRY","name":"PRY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"SPY","name":"SPY","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPR","name":"CPPR -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPRX","name":"CPPRX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPRY","name":"CPPRY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PPR","name":"PPR -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"AZ","name":"AZ -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"SPX","name":"SPX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPZ","name":"CPPZ -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"SPZ","name":"SPZ-","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPY","name":"CPPY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PR","name":"PR -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPA","name":"CPPA -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CRZ","name":"CRZ -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PPZ","name":"PPZ-","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PPX","name":"PPX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PPY","name":"PPY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CPPX","name":"CPPX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CZ","name":"CZ -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PY","name":"PY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CRY","name":"CRY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PX","name":"PX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CR","name":"CR - ","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PA","name":"PA - ","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PZ","name":"PZ -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CY","name":"CY -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"Cx","name":"Cx - Unknown Cropland","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"AP","name":"AP","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CC","name":"CC","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"PRZ","name":"PRZ","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"CRX","name":"CRX -","level2":"Unknown agriculture","level1":"Agriculture","color1":"#ce491c","color2":"#e6a48d"},
{"code":"ER","name":"ER - Erosion","level2":"Erosion","level1":"Barren","color1":"#033e7b","color2":"#1c5188"},
{"code":"GP","name":"GP - Gravel Pit","level2":"Gravel pit","level1":"Barren","color1":"#033e7b","color2":"#356495"},
{"code":"Gr","name":"Gr - Gravel ","level2":"Gravel pit","level1":"Barren","color1":"#033e7b","color2":"#356495"},
{"code":"CL","name":"CL - Clay Pit","level2":"Other","level1":"Barren","color1":"#033e7b","color2":"#678baf"},
{"code":"MF","name":"MF - Mud Flats","level2":"Other","level1":"Barren","color1":"#033e7b","color2":"#678baf"},
{"code":"LAKE DRIED UP","name":"LAKE DRIED UP","level2":"Other","level1":"Barren","color1":"#033e7b","color2":"#678baf"},
{"code":"MP","name":"MP - Marl Pit","level2":"Other","level1":"Barren","color1":"#033e7b","color2":"#678baf"},
{"code":"SB","name":"SB - Sand Bar","level2":"Other","level1":"Barren","color1":"#033e7b","color2":"#678baf"},
{"code":"Qz","name":"Qz - Quarry","level2":"Quarry","level1":"Barren","color1":"#033e7b","color2":"#9ab1ca"},
{"code":"RO","name":"RO - Rock Outcrop","level2":"Rock outcrop","level1":"Barren","color1":"#033e7b","color2":"#b3c5d7"},
{"code":"Bluff","name":"Bluff","level2":"Rock outcrop","level1":"Barren","color1":"#033e7b","color2":"#b3c5d7"},
{"code":"St","name":"St - Shoal Bottom With Debris","level2":"Sand","level1":"Barren","color1":"#033e7b","color2":"#e5ebf1"},
{"code":"Sand","name":"Sand","level2":"Sand","level1":"Barren","color1":"#033e7b","color2":"#e5ebf1"},
{"code":"CM","name":"CM - Cemetery ","level2":"Cemetery","level1":"Developed","color1":"#ffde56","color2":"#7f6f2b"},
{"code":"U","name":"U - ","level2":"City","level1":"Developed","color1":"#ffde56","color2":"#b29b3c"},
{"code":"CT","name":"CT - City","level2":"City","level1":"Developed","color1":"#ffde56","color2":"#b29b3c"},
{"code":"UR","name":"UR - Unknown Residential","level2":"City","level1":"Developed","color1":"#ffde56","color2":"#b29b3c"},
{"code":"GC","name":"GC - Golf Course","level2":"Golf course","level1":"Developed","color1":"#ffde56","color2":"#e5c74d"},
{"code":"FG","name":"FG - Fair Grounds","level2":"Other developed","level1":"Developed","color1":"#ffde56","color2":"#ffd423"},
{"code":"MY","name":"MY - Mill Yard","level2":"Other developed","level1":"Developed","color1":"#ffde56","color2":"#ffd424"},
{"code":"ARPT","name":"Airport","level2":"Other developed","level1":"Developed","color1":"#ffde56","color2":"#ffd425"},
{"code":"CA","name":"CA - Camp","level2":"Other developed","level1":"Developed","color1":"#ffde56","color2":"#ffd426"},
{"code":"BRICK YARD","name":"BRICK YARD","level2":"Other developed","level1":"Developed","color1":"#ffde56","color2":"#ffd427"},
{"code":"Brickyard","name":"Brickyard","level2":"Other developed","level1":"Developed","color1":"#ffde56","color2":"#ffd428"},
{"code":"PD","name":"PD - Public Dump","level2":"Public dump","level1":"Developed","color1":"#ffde56","color2":"#ffde56"},
{"code":"RESERVE","name":"RESERVE","level2":"Recreation Area","level1":"Developed","color1":"#ffde56","color2":"#ffe370"},
{"code":"PARK","name":"PARK","level2":"Recreation Area","level1":"Developed","color1":"#ffde56","color2":"#ffe370"},
{"code":"Rec","name":"Rec - Recreation Area","level2":"Recreation Area","level1":"Developed","color1":"#ffde56","color2":"#ffe370"},
{"code":"CV","name":"CV - Urban Property","level2":"Urban","level1":"Developed","color1":"#ffde56","color2":"#ffeda3"},
{"code":"Urban","name":"URBAN","level2":"Urban","level1":"Developed","color1":"#ffde56","color2":"#ffeda3"},
{"code":"Slash","name":"Slash","level2":"Cutover","level1":"Forest Disturbance","color1":"#e86666","color2":"#ea7575"},
{"code":"Cutover","name":"Cutover","level2":"Cutover","level1":"Forest Disturbance","color1":"#e86666","color2":"#ea7575"},
{"code":"Recent Cut","name":"Recent Cut","level2":"Cutover","level1":"Forest Disturbance","color1":"#e86666","color2":"#ea7575"},
{"code":"Snags","name":"Snags","level2":"Cutover","level1":"Forest Disturbance","color1":"#e86666","color2":"#ea7575"},
{"code":"D5b","name":"D5b - Dead Timber","level2":"Recent burn","level1":"Forest Disturbance","color1":"#e86666","color2":"#ee9393"},
{"code":"D5","name":"D5 - Recent Burn","level2":"Recent burn","level1":"Forest Disturbance","color1":"#e86666","color2":"#ee9393"},
{"code":"B5","name":"B5 -","level2":"Recent burn","level1":"Forest Disturbance","color1":"#e86666","color2":"#ee9393"},
{"code":"S","name":"S - Stump","level2":"Stump","level1":"Forest Disturbance","color1":"#e86666","color2":"#f3b2b2"},
{"code":"Windfall","name":"Windfall","level2":"Windfall","level1":"Forest Disturbance","color1":"#e86666","color2":"#f8d1d1"},
{"code":"D3b","name":"D3b - Balsam","level2":"Balsam","level1":"Lowland Coniferous Forest","color1":"#00f9ff","color2":"#006366"},
{"code":"D3u","name":"D3u - Inferior Black spruce","level2":"Black spruce","level1":"Lowland Coniferous Forest","color1":"#00f9ff","color2":"#009599"},
{"code":"D3","name":"D3 - Black Spruce","level2":"Black spruce","level1":"Lowland Coniferous Forest","color1":"#00f9ff","color2":"#009599"},
{"code":"C3","name":"C3 - Tamarack","level2":"Tamarack","level1":"Lowland Coniferous Forest","color1":"#00f9ff","color2":"#00a86b"},
{"code":"C3uu","name":"C3uu - Inferior tamarack","level2":"Tamarack","level1":"Lowland Coniferous Forest","color1":"#00f9ff","color2":"#00a86b"},
{"code":"B3","name":"B3 - White Cedar","level2":"White cedar","level1":"Lowland Coniferous Forest","color1":"#00f9ff","color2":"#00c7cc"},
{"code":"A3uu","name":"A3uu - Inferior black ash, elm and maple","level2":"Inferior upland hardwoods","level1":"Lowland Deciduous Forest","color1":"#e7b270","color2":"#e9b97e"},
{"code":"A3","name":"A3 - Swamp Hardwoods (Black ash, elm and maple)","level2":"Swamp Hardwoods (Black ash, elm and maple)","level1":"Lowland Deciduous Forest","color1":"#e7b270","color2":"#f0d0a9"},
{"code":"A3u","name":"A3u - Inferior black ash, elm and maple","level2":"Swamp Hardwoods (Black ash, elm and maple)","level1":"Lowland Deciduous Forest","color1":"#e7b270","color2":"#f0d0a9"},
{"code":"A","name":"A - Abandoned","level2":"Abandoned","level1":"Open","color1":"#8c9767","color2":"#707952"},
{"code":"AA","name":"AA -","level2":"Abandoned","level1":"Open","color1":"#8c9767","color2":"#707952"},
{"code":"AO","name":"AO -","level2":"Abandoned","level1":"Open","color1":"#8c9767","color2":"#707952"},
{"code":"OPP","name":"OPP -","level2":"Abandoned Pasture","level1":"Open","color1":"#8c9767","color2":"#7e885d"},
{"code":"PO","name":"PO -","level2":"Abandoned Pasture","level1":"Open","color1":"#8c9767","color2":"#7e885d"},
{"code":"OP","name":"OP - Open Pasture","level2":"Abandoned Pasture","level1":"Open","color1":"#8c9767","color2":"#7e885d"},
{"code":"AP -","name":"AP - Abandoned Pasture","level2":"Abandoned Pasture","level1":"Open","color1":"#8c9767","color2":"#7e885d"},
{"code":"O","name":"O - Open ","level2":"Open","level1":"Open","color1":"#8c9767","color2":"#8c9767"},
{"code":"CPP","name":"CPP - Poor Land Previously Cropped","level2":"Poor Land Previously Cropped","level1":"Open","color1":"#8c9767","color2":"#98a276"},
{"code":"A5","name":"A5 - Raspberry","level2":"Raspberry","level1":"Open","color1":"#8c9767","color2":"#a3ac85"},
{"code":"UG","name":"UG - Unknown Grassland","level2":"Unknown grassland","level1":"Open","color1":"#8c9767","color2":"#aeb694"},
{"code":"IS","name":"IS - Island","level2":"Island","level1":"Other","color1":"#e7b270","color2":"#cd5c5c"},
{"code":"INDIAN MOUNDS","name":"INDIAN MOUNDS","level2":"Other ","level1":"Other","color1":"#e7b270","color2":"#e09a44"},
{"code":"DH","name":"DH -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"NP","name":"NP","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"PS","name":"PS -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"Sch.Gs","name":"Sch.Gs -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SPC","name":"SPC -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SPRZ","name":"SPRZ -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"Z","name":"Z - ","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"AX","name":"AX -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"AY","name":"AY -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"EP","name":"EP -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"GG","name":"GG -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"K","name":"K - ","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"P.V.","name":"P.V.-","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SD","name":"SD -","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"DA","name":"DA","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SC","name":"SC","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SL","name":"SL","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SN","name":"SN","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"SR","name":"SR","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"WE","name":"WE","level2":"Unknown","level1":"Other","color1":"#e7b270","color2":"#e7b270"},
{"code":"F","name":"F -","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"UF","name":"UF - Unknown Forest","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"C3uuu","name":"C3uuu -","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"Duu","name":"Duu - ","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"Duuu","name":"Duuu - ","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"C1uu","name":"C1uu - ","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"NF","name":"National Forest","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"C4b","name":"C4b","level2":"Unknown Forest","level1":"Unknown Forest","color1":"#70a5e7","color2":"#70a5e7"},
{"code":"D2","name":"D2 - Jack Pine","level2":"Jack pine","level1":"Upland Coniferous Forest","color1":"#B270E7","color2":"#9a44e0"},
{"code":"C2","name":"C2 - Norway Pine","level2":"Norway pine","level1":"Upland Coniferous Forest","color1":"#B270E7","color2":"#b270e7"},
{"code":"B2","name":"B2 - White Pine","level2":"White pine","level1":"Upland Coniferous Forest","color1":"#B270E7","color2":"#ca9cee"},
{"code":"B2b","name":"B2b -","level2":"White Pine","level1":"Upland Coniferous Forest","color1":"#B270E7","color2":"#ca9cee"},
{"code":"B","name":"B - Birch","level2":"Birch","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#f4f4f4"},
{"code":"D1u","name":"D1u - Good Quality with White Oak","level2":"Good quality white oak","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#eaeaea"},
{"code":"C1b","name":"C1b - Inferior C1","level2":"Inferior popple with white birch","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#e0e0e0"},
{"code":"D1uuu","name":"D1uuu - Poor","level2":"Inferior scrub oak and red maple","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#d6d6d6"},
{"code":"A1u","name":"A1u - Inferior upland hardwoods","level2":"Inferior upland hardwoods","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#cccccc"},
{"code":"A1uu","name":"A1uu - Inferior upland hardwoods","level2":"Inferior upland hardwoods","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#cccccc"},
{"code":"D1b","name":"D1b - Inferior D1","level2":"Jack pine","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#a3a3a3"},
{"code":"D1uu","name":"D1uu - Medium Gr. Mostly Red Oak","level2":"Medium Gr. Mostly Red Oak???","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#7a7a7a"},
{"code":"D1","name":"D1 - Oak - Hickory","level2":"Oak hickory","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#515151"},
{"code":"E1","name":"E1 - Pin Cherry ","level2":"Pin cherry","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#d1d1d1"},
{"code":"C1","name":"C1 - Popple with White Birch","level2":"Popple with white birch","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#dbdbdb"},
{"code":"D","name":"D - Scrub Oak","level2":"Scrub oak","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#e5e5e5"},
{"code":"A1","name":"A1 - Upland Hardwoods","level2":"Upland hardwoods","level1":"Upland Deciduous Forest","color1":"#cccccc","color2":"#b7b7b7"},
{"code":"B1","name":"B1 - Hardwood with Conifers","level2":"Hardwood with conifers","level1":"Upland Mixed Forest","color1":"#4ea248","color2":"#346d30"},
{"code":"A2","name":"A2 - Hemlock with Hardwood","level2":"Hemlock with hardwoods","level1":"Upland Mixed Forest","color1":"#4ea248","color2":"#3d7f38"},
{"code":"B1b","name":"B1b  -  Inferior B1","level2":"Inferior hardwood with conifers","level1":"Upland Mixed Forest","color1":"#4ea248","color2":"#459040"},
{"code":"SPRING","name":"SPRING - Spring","level2":"Water","level1":"Water","color1":"#abd4dd","color2":"#abd4dd"},
{"code":"WR","name":"WR - River","level2":"Water","level1":"Water","color1":"#abd4dd","color2":"#abd4dd"},
{"code":"WO","name":"WO - Open Water","level2":"Water","level1":"Water","color1":"#abd4dd","color2":"#abd4dd"},
{"code":"BD","name":"BD - Beaver Dam","level2":"Beaver flowage","level1":"Wetlands","color1":"#c3a2a1","color2":"#c3a2a1"},
{"code":"BF","name":"BF - Beaver Flowage","level2":"Beaver flowage","level1":"Wetlands","color1":"#c3a2a1","color2":"#c3a2a1"},
{"code":"BP","name":"BP - Beaver Pond","level2":"Beaver flowage","level1":"Wetlands","color1":"#c3a2a1","color2":"#c3a2a1"},
{"code":"B4","name":"B4 - Cat Tail Marsh","level2":"Cat tail marsh","level1":"Wetlands","color1":"#c3a2a1","color2":"#a57472"},
{"code":"F4","name":"F4 - Cranberry Marsh ","level2":"Cranberry marsh","level1":"Wetlands","color1":"#c3a2a1","color2":"#af8382"},
{"code":"C4","name":"C4 - Grass Marsh","level2":"Grass marsh","level1":"Wetlands","color1":"#c3a2a1","color2":"#b99391"},
{"code":"D4","name":"D4 - Leather Leaf","level2":"Leather leaf","level1":"Wetlands","color1":"#c3a2a1","color2":"#cdb1b1"},
{"code":"D4b","name":"D4b - Inferior leather leaf","level2":"Leather leaf","level1":"Wetlands","color1":"#c3a2a1","color2":"#cdb1b1"},
{"code":"A4","name":"A4 - Tagalder, Willow, Dogwood, Etc.","level2":"Tagalder, willow, dogwood, etc.","level1":"Wetlands","color1":"#c3a2a1","color2":"#d7c1c0"},
{"code":"E3","name":"E3 - ","level2":"Unknown wetlands","level1":"Wetlands","color1":"#c3a2a1","color2":"#e1d0d0"},
{"code":"C4u","name":"C4u -","level2":"Unknown wetlands","level1":"Wetlands","color1":"#c3a2a1","color2":"#e1d0d0"},
{"code":"E4","name":"E4 - Weedy Peat ","level2":"Weedy peat","level1":"Wetlands","color1":"#c3a2a1","color2":"#9c8180"}]
}
