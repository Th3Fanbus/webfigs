var elements = ["Uuo", "Uup", "Uus", "Uut", "Ac", "Ag", "Al", "Am", "Ar", "As", "At", "Au", "Ba", "Be", "Bh", "Bi", "Bk", "Br", "Ca", "Cd", "Ce", "Cf", "Cl", "Cm", "Cn", "Co", "Cr", "Cs", "Cu", "Db", "Ds", "Dy", "Er", "Es", "Eu", "Fe", "Fl", "Fm", "Fr", "Ga", "Gd", "Ge", "He", "Hf", "Hg", "Ho", "Hs", "In", "Ir", "Kr", "La", "Li", "Lr", "Lu", "Lv", "Md", "Mg", "Mn", "Mo", "Mt", "Na", "Nb", "Nd", "Ne", "Ni", "No", "Np", "Os", "Pa", "Pb", "Pd", "Pm", "Po", "Pr", "Pt", "Pu", "Ra", "Rb", "Re", "Rf", "Rg", "Rh", "Rn", "Ru", "Sb", "Sc", "Se", "Sg", "Si", "Sm", "Sn", "Sr", "Ta", "Tb", "Tc", "Te", "Th", "Ti", "Tl", "Tm", "Xe", "Yb", "Zn", "Zr", "B", "C", "F", "H", "I", "K", "N", "O", "P", "S", "U", "V", "W", "Y"];
var elnumber = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];

"use strict";
function calc() {
    "use strict";
    var str = document.getElementById("input").value;
    var ra = [];
    var pa = [];
    var n = str.search("=");
    if (n != -1) {
        pa[0] = str.slice(n+1);
        ra[0] = str.slice(0,n);
    } else {
        n = str.search(">");
        if (n != -1) {
            pa[0] = str.slice(n+1);
            ra[0] = str.slice(0,n);
        } else {
            stdout("Error, not a reaction.");
            return -1;
        }
    }
    moleculize(ra); 
    stdout(ra);
    moleculize(pa); 
    stdout(pa);
    for (var i = 0; i < elements.length; i++) {
        n = pa[0].search(elements[i]);
        if (n != 1) {
            
        }
    }
    
}

function moleculize(arr) {
    var n = arr[0].search("\\+");
    for (var i = 0; n != -1; i++) {
        arr[i+1] = arr[i].slice(n+1);
        arr[i] = arr[i].slice(0,n);
        n = arr[i+1].search("\\+");
    }
}

function stdout(msg) {
    document.getElementById("output").innerHTML = document.getElementById("output").innerHTML+msg+"<br />";
}
