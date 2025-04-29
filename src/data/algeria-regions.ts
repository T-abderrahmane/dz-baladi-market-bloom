
export const wilayas = [
  { id: "1", name: "Adrar" },
  { id: "2", name: "Chlef" },
  { id: "3", name: "Laghouat" },
  { id: "4", name: "Oum El Bouaghi" },
  { id: "5", name: "Batna" },
  { id: "6", name: "Béjaïa" },
  { id: "7", name: "Biskra" },
  { id: "8", name: "Béchar" },
  { id: "9", name: "Blida" },
  { id: "10", name: "Bouira" },
  { id: "11", name: "Tamanrasset" },
  { id: "12", name: "Tébessa" },
  { id: "13", name: "Tlemcen" },
  { id: "14", name: "Tiaret" },
  { id: "15", name: "Tizi Ouzou" },
  { id: "16", name: "Alger" },
  { id: "17", name: "Djelfa" },
  { id: "18", name: "Jijel" },
  { id: "19", name: "Sétif" },
  { id: "20", name: "Saïda" },
  { id: "21", name: "Skikda" },
  { id: "22", name: "Sidi Bel Abbès" },
  { id: "23", name: "Annaba" },
  { id: "24", name: "Guelma" },
  { id: "25", name: "Constantine" },
  { id: "26", name: "Médéa" },
  { id: "27", name: "Mostaganem" },
  { id: "28", name: "M'Sila" },
  { id: "29", name: "Mascara" },
  { id: "30", name: "Ouargla" },
  { id: "31", name: "Oran" },
  { id: "32", name: "El Bayadh" },
  { id: "33", name: "Illizi" },
  { id: "34", name: "Bordj Bou Arréridj" },
  { id: "35", name: "Boumerdès" },
  { id: "36", name: "El Tarf" },
  { id: "37", name: "Tindouf" },
  { id: "38", name: "Tissemsilt" },
  { id: "39", name: "El Oued" },
  { id: "40", name: "Khenchela" },
  { id: "41", name: "Souk Ahras" },
  { id: "42", name: "Tipaza" },
  { id: "43", name: "Mila" },
  { id: "44", name: "Aïn Defla" },
  { id: "45", name: "Naâma" },
  { id: "46", name: "Aïn Témouchent" },
  { id: "47", name: "Ghardaïa" },
  { id: "48", name: "Relizane" },
  { id: "49", name: "El M'Ghair" },
  { id: "50", name: "El Meniaa" },
  { id: "51", name: "Ouled Djellal" },
  { id: "52", name: "Bordj Badji Mokhtar" },
  { id: "53", name: "Béni Abbès" },
  { id: "54", name: "Timimoun" },
  { id: "55", name: "Touggourt" },
  { id: "56", name: "Djanet" },
  { id: "57", name: "In Salah" },
  { id: "58", name: "In Guezzam" }
];

export const communesByWilaya: { [key: string]: { id: string; name: string }[] } = {
  "1": [
    { id: "101", name: "Adrar" },
    { id: "102", name: "Bouda" },
    { id: "103", name: "Ouled Ahmed Tammi" },
    { id: "104", name: "Reggane" }
  ],
  "2": [
    { id: "201", name: "Chlef" },
    { id: "202", name: "Ténès" },
    { id: "203", name: "Bénairia" },
    { id: "204", name: "El Karimia" }
  ],
  "3": [
    { id: "301", name: "Laghouat" },
    { id: "302", name: "Aflou" },
    { id: "303", name: "Ksar El Hirane" },
    { id: "304", name: "Hassi Delaa" }
  ],
  "4": [
    { id: "401", name: "Oum El Bouaghi" },
    { id: "402", name: "Aïn Beïda" },
    { id: "403", name: "Ain M'lila" },
    { id: "404", name: "Ksar Sbahi" }
  ],
  "5": [
    { id: "501", name: "Batna" },
    { id: "502", name: "Barika" },
    { id: "503", name: "Merouana" },
    { id: "504", name: "Arris" }
  ],
  "6": [
    { id: "601", name: "Béjaïa" },
    { id: "602", name: "Akbou" },
    { id: "603", name: "Souk El Ténine" },
    { id: "604", name: "Tichy" }
  ],
  "7": [
    { id: "701", name: "Biskra" },
    { id: "702", name: "Ouled Djellal" },
    { id: "703", name: "Sidi Khaled" },
    { id: "704", name: "Tolga" }
  ],
  "8": [
    { id: "801", name: "Béchar" },
    { id: "802", name: "Beni Abbès" },
    { id: "803", name: "Kenadsa" },
    { id: "804", name: "Abadla" }
  ],
  "9": [
    { id: "901", name: "Blida" },
    { id: "902", name: "Boufarik" },
    { id: "903", name: "Bougara" },
    { id: "904", name: "Mouzaïa" }
  ],
  "10": [
    { id: "1001", name: "Bouira" },
    { id: "1002", name: "Lakhdaria" },
    { id: "1003", name: "Sour El Ghozlane" },
    { id: "1004", name: "Kadiria" }
  ],
  // Add more communes for the remaining wilayas as needed
  "16": [
    { id: "1601", name: "Alger Centre" },
    { id: "1602", name: "Bab El Oued" },
    { id: "1603", name: "El Harrach" },
    { id: "1604", name: "Dar El Beïda" },
    { id: "1605", name: "Bab Ezzouar" },
    { id: "1606", name: "Birtouta" }
  ],
  "31": [
    { id: "3101", name: "Oran" },
    { id: "3102", name: "Bir El Djir" },
    { id: "3103", name: "Es Senia" },
    { id: "3104", name: "Arzew" },
    { id: "3105", name: "Ain Turk" }
  ]
};
