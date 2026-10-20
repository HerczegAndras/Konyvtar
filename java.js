function Könyv(Cím, Szerző,Kategória, KiadásÉve, Oldalszám,Kölcsönözve,) {
    this.Cím = Cím;
    this.Szerző = Szerző;
    this.Kategória = Kategória;
    this.KiadásÉve = KiadásÉve;
    this.Oldalszám =Number(Oldalszám) ;
    this.Kölcsönözve = Kölcsönözve;
    this.kolcsonoz=()=>{
        this.Kölcsönözve=true
    }
    this.visszahoz=()=>{
        this.Kölcsönözve=false
    }
}
let könyv1 = new Könyv("A Gyűrűk Ura", "J.R.R. Tolkien", "Fantasy", 1954, 1216, false);
let könyv2 = new Könyv("1984", "George Orwell", "Dystopia", 1949, 328, false);
let könyv3 = new Könyv("A Szél árnyéka", "Carlos Ruiz Zafón", "Fikció", 2001, 576, false);
let könyv4 = new Könyv("A Nagy Gatsby", "F. Scott Fitzgerald", "Klasszikus", 1925, 180, false);
let könyvek = [könyv1, könyv2, könyv3, könyv4];

function hozzáad() {
    let cím = document.getElementById("címInput").value;
    let szerző = document.getElementById("szerzőInput").value;
    let kategória = document.getElementById("kategóriaInput").value;
    let kiadásÉve = document.getElementById("kiadásÉveInput").value;
    let oldalszám = document.getElementById("oldalszámInput").value;

    let újKönyv = new Könyv(cím, szerző, kategória, kiadásÉve, oldalszám, false);
    könyvek.push(újKönyv);
    tablazatBetoltes();
    feltoltLegordulot();
};

function kiratas() {
    let konyvekirasas = document.getElementById("KonyvekKiras");
    
    let allapot="Kölcsönözhető";
    könyvek.forEach((könyv) => {
        konyvekirasas.innerHTML += "Cím:" + könyv.Cím + "<br>" ;
        konyvekirasas.innerHTML += "Szerző: " + könyv.Szerző + "<br>";
        konyvekirasas.innerHTML += "Kiadás Éve: " + könyv.KiadásÉve + "<br>";
        konyvekirasas.innerHTML += "Oldalszám: " + könyv.Oldalszám + "<br>";

        if (könyv.Kölcsönözve) {
            allapot = "Kölcsönözve";
        } else {
            allapot = "Kölcsönözhető";
        }
        konyvekirasas.innerHTML += "Állapot: " + allapot + "<br>";
    });
}


function legregebbiKönyv(könyvek) {
    
        let regebbi = könyvek[0];
        for (let i = 0; i < könyvek.length; i++) {
            if (könyvek[i].KiadásÉve < regebbi.KiadásÉve) {
                regebbi = könyvek[i];
            }
        }
        document.getElementById("LegregebbiKonyv").innerHTML = "A legregebbi könyv: " + regebbi.Cím + ", Kiadás Éve: " + regebbi.KiadásÉve;
    }

function legvastagabbKönyv(könyvek) {
    let vastagabb = könyvek[0];
    for (let i = 0; i < könyvek.length; i++) {
        if (könyvek[i].Oldalszám > vastagabb.Oldalszám) {
            vastagabb = könyvek[i];
        }
    }
    document.getElementById("LegvastagabbKonyv").innerHTML = "A legvastagabb könyv: " + vastagabb.Cím + ", Oldalszám: " + vastagabb.Oldalszám;
}

function SzabadKönyvek(könyvek) {
    let szabadkonyvek=könyvek.filter(könyv => !könyv.Kölcsönözve);
    let szabadKonyvekListaja = szabadkonyvek.map(könyv => könyv.Cím).join(", ");
    document.getElementById("SzabadKonyvek").innerHTML = "Szabad könyvek: " + szabadKonyvekListaja;
}

function atlagOldalszam(könyvek) {
    let összesOldalszám = könyvek.reduce((össz, könyv) => össz + könyv.Oldalszám, 0);
    
    let átlag = összesOldalszám / könyvek.length;
    document.getElementById("AtlagOldalszam").innerHTML = "Átlag oldalszám: " + átlag;
}

function tablazatBetoltes() {
    let tbody = document.getElementById("KonyvekTablaBody");
    tbody.innerHTML = ""; 

    könyvek.forEach((könyv, index) => {
        let row = tbody.insertRow();
        let címCell = row.insertCell(0);
        let szerzőCell = row.insertCell(1);
        let kategóriaCell = row.insertCell(2);
        let oldalszámCell = row.insertCell(3);
        let kiadásÉveCell = row.insertCell(4);
        let állapotCell = row.insertCell(5);
        let műveletCell = row.insertCell(6);

        címCell.textContent = könyv.Cím;
        szerzőCell.textContent = könyv.Szerző;
        kategóriaCell.textContent = könyv.Kategória;
        oldalszámCell.textContent = könyv.Oldalszám;
        kiadásÉveCell.textContent = könyv.KiadásÉve;

    
        if (könyv.Kölcsönözve) {
            állapotCell.textContent = "Kölcsönözve ";
        } else {
            állapotCell.textContent = "Kölcsönözhető ";
        }

       
        const modositButton = document.createElement("button");
        modositButton.type = "button";
        modositButton.className = "rounded-lg bg-blue-600 px-3 py-1 font-medium text-white transition hover:bg-blue-700 mr-3 mb-1";
        modositButton.textContent = "Módosítás";
        
        modositButton.addEventListener("click", () => {
            if (könyv.Kölcsönözve){
                könyv.visszahoz()
            }
            else{
                könyv.kolcsonoz()
            }
            tablazatBetoltes(); 
        });


        
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "rounded-lg bg-red-600 px-3 py-1 font-medium text-white transition hover:bg-red-700";
        deleteButton.textContent = "Törlés";
        
        deleteButton.addEventListener("click", () => {
            törles(index); 
        });

        
        műveletCell.appendChild(modositButton);
        műveletCell.appendChild(deleteButton);
    });
}

function törles(index) {
    könyvek.splice(index, 1); 
    tablazatBetoltes();        
}


function kolcsonozhetoKonyvek(könyvek) {
   
    let kolcsonozheto = könyvek.filter(könyv => !könyv.Kölcsönözve);
    let kolcsonozhetoListaja = kolcsonozheto.map(könyv => könyv.Cím).join(", ");
    document.getElementById("KolcsonozhetoKonyv").innerHTML = "Kölcsönözhető könyvek: " + kolcsonozhetoListaja;
}
function feltoltLegordulot() {
        let valasztott = document.getElementById("Kategoriavalasztas");
        valasztott.innerHTML = '<option value="all">Összes kategória</option>';
        
        let egyediKategoriak = [...new Set(könyvek.map(könyv => könyv.Kategória))];
        
        egyediKategoriak.forEach(kat => {
            let opcio = document.createElement("option");
            opcio.value = kat;      
            opcio.textContent = kat;
            valasztott.appendChild(opcio);
        });
    }

function KategoriaSzures(){
    let kivalasztott=document.getElementById("Kategoriavalasztas").value
    let kiirat=document.getElementById("KönyvekSzürve")
    kiirat.innerHTML="";

    könyvek.forEach(konyv => {
    if (konyv.Kategória === kivalasztott) {
      
        kiirat.innerHTML += `<p><strong>${konyv.Cím}</strong> - ${konyv.Szerző} (${konyv.Kategória})</p>`;
    }
});

    

    
   

}
     
 


document.addEventListener("DOMContentLoaded", () => {
    tablazatBetoltes(); 
    feltoltLegordulot();
});
