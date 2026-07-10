export const ORDERS = [
  {
    id: 'ORD-2024-00958',
    date: '2024-07-09',
    status: 'In lavorazione',
    statusColor: 'yellow',
    total: '€ 22.100,00',
    items: [
      { code: 'TOPAR-16', description: 'Tondo per CA TOPAR-S 500C ø16', qty: '15.000 kg', unitPrice: '€ 0,84/kg', total: '€ 12.600,00' },
      { code: 'TOPAR-20', description: 'Tondo per CA TOPAR-S 500C ø20', qty: '11.000 kg', unitPrice: '€ 0,86/kg', total: '€ 9.460,00' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '09 lug', done: true },
      { label: 'In lavorazione', date: '09 lug', done: true },
      { label: 'Pronto per spedizione', date: '–', done: false },
      { label: 'In transito', date: '–', done: false },
      { label: 'Consegnato', date: '–', done: false },
    ],
  },
  {
    id: 'ORD-2024-00934',
    date: '2024-07-03',
    status: 'In transito',
    statusColor: 'blue',
    total: '€ 9.720,00',
    items: [
      { code: 'RND-30', description: 'Tondo pieno ø30 – EN 10060', qty: '4.000 kg', unitPrice: '€ 0,88/kg', total: '€ 3.520,00' },
      { code: 'ANG-60x6', description: 'Angolare 60×60×6 – EN 10056', qty: '7.000 kg', unitPrice: '€ 0,886/kg', total: '€ 6.200,00' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '03 lug', done: true },
      { label: 'In lavorazione', date: '05 lug', done: true },
      { label: 'Pronto per spedizione', date: '08 lug', done: true },
      { label: 'In transito', date: '09 lug', done: true },
      { label: 'Consegnato', date: '11 lug', done: false },
    ],
  },
  {
    id: 'ORD-2024-00891',
    date: '2024-06-15',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 18.450,00',
    items: [
      { code: 'IPE-200', description: 'Travi IPE 200 – EN 10365', qty: '5.000 kg', unitPrice: '€ 0,92/kg', total: '€ 4.600,00' },
      { code: 'HEA-160', description: 'Travi HEA 160 – EN 10365', qty: '8.000 kg', unitPrice: '€ 0,98/kg', total: '€ 7.840,00' },
      { code: 'UPN-120', description: 'Profili UPN 120 – EN 10365', qty: '6.500 kg', unitPrice: '€ 0,925/kg', total: '€ 6.012,50' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '15 giu', done: true },
      { label: 'In lavorazione', date: '17 giu', done: true },
      { label: 'Pronto per spedizione', date: '19 giu', done: true },
      { label: 'In transito', date: '20 giu', done: true },
      { label: 'Consegnato', date: '22 giu', done: true },
    ],
  },
  {
    id: 'ORD-2024-00852',
    date: '2024-05-28',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 31.050,00',
    items: [
      { code: 'HEA-200', description: 'Travi HEA 200 – EN 10365', qty: '12.000 kg', unitPrice: '€ 0,975/kg', total: '€ 11.700,00' },
      { code: 'IPE-300', description: 'Travi IPE 300 – EN 10365', qty: '10.000 kg', unitPrice: '€ 0,95/kg', total: '€ 9.500,00' },
      { code: 'UPN-200', description: 'Profili UPN 200 – EN 10365', qty: '9.000 kg', unitPrice: '€ 0,94/kg', total: '€ 8.460,00' },
      { code: 'SQB-30', description: 'Quadro pieno 30×30 – EN 10059', qty: '1.500 kg', unitPrice: '€ 0,895/kg', total: '€ 1.342,50' },
    ],
    deliveryAddress: 'Via Roma 42, 20121 Milano (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '28 mag', done: true },
      { label: 'In lavorazione', date: '30 mag', done: true },
      { label: 'Pronto per spedizione', date: '03 giu', done: true },
      { label: 'In transito', date: '04 giu', done: true },
      { label: 'Consegnato', date: '06 giu', done: true },
    ],
  },
  {
    id: 'ORD-2024-00821',
    date: '2024-05-10',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 6.200,00',
    items: [
      { code: 'ELA-60x6', description: 'Angolare 60×60×6 – EN 10056', qty: '7.000 kg', unitPrice: '€ 0,886/kg', total: '€ 6.200,00' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '10 mag', done: true },
      { label: 'In lavorazione', date: '12 mag', done: true },
      { label: 'Pronto per spedizione', date: '15 mag', done: true },
      { label: 'In transito', date: '16 mag', done: true },
      { label: 'Consegnato', date: '18 mag', done: true },
    ],
  },
  {
    id: 'ORD-2024-00778',
    date: '2024-04-02',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 41.800,00',
    items: [
      { code: 'TOPAR-12', description: 'Tondo per CA TOPAR-S 500C ø12', qty: '20.000 kg', unitPrice: '€ 0,84/kg', total: '€ 16.800,00' },
      { code: 'TOPAR-16', description: 'Tondo per CA TOPAR-S 500C ø16', qty: '18.000 kg', unitPrice: '€ 0,84/kg', total: '€ 15.120,00' },
      { code: 'TOPAR-25', description: 'Tondo per CA TOPAR-S 500C ø25', qty: '12.000 kg', unitPrice: '€ 0,848/kg', total: '€ 10.176,00' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '02 apr', done: true },
      { label: 'In lavorazione', date: '04 apr', done: true },
      { label: 'Pronto per spedizione', date: '09 apr', done: true },
      { label: 'In transito', date: '10 apr', done: true },
      { label: 'Consegnato', date: '12 apr', done: true },
    ],
  },
  {
    id: 'ORD-2024-00741',
    date: '2024-03-18',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 14.625,00',
    items: [
      { code: 'IPE-160', description: 'Travi IPE 160 – EN 10365', qty: '8.000 kg', unitPrice: '€ 0,96/kg', total: '€ 7.680,00' },
      { code: 'FPL-50x6', description: 'Piatto 50×6 – EN 10058', qty: '3.500 kg', unitPrice: '€ 0,915/kg', total: '€ 3.202,50' },
      { code: 'RDB-20', description: 'Tondo pieno ø20 – EN 10060', qty: '4.200 kg', unitPrice: '€ 0,88/kg', total: '€ 3.696,00' },
    ],
    deliveryAddress: 'Via Roma 42, 20121 Milano (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '18 mar', done: true },
      { label: 'In lavorazione', date: '20 mar', done: true },
      { label: 'Pronto per spedizione', date: '25 mar', done: true },
      { label: 'In transito', date: '26 mar', done: true },
      { label: 'Consegnato', date: '28 mar', done: true },
    ],
  },
  {
    id: 'ORD-2024-00698',
    date: '2024-02-20',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 27.340,00',
    items: [
      { code: 'HEA-160', description: 'Travi HEA 160 – EN 10365', qty: '14.000 kg', unitPrice: '€ 0,975/kg', total: '€ 13.650,00' },
      { code: 'IPE-200', description: 'Travi IPE 200 – EN 10365', qty: '10.000 kg', unitPrice: '€ 0,92/kg', total: '€ 9.200,00' },
      { code: 'ELA-40x4', description: 'Angolare 40×40×4 – EN 10056', qty: '5.000 kg', unitPrice: '€ 0,93/kg', total: '€ 4.650,00' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '20 feb', done: true },
      { label: 'In lavorazione', date: '22 feb', done: true },
      { label: 'Pronto per spedizione', date: '27 feb', done: true },
      { label: 'In transito', date: '28 feb', done: true },
      { label: 'Consegnato', date: '01 mar', done: true },
    ],
  },
  {
    id: 'ORD-2024-00651',
    date: '2024-01-15',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 8.910,00',
    items: [
      { code: 'SBQ-30', description: 'Tondo speciale SBQ ø30 – EN 10060', qty: '4.500 kg', unitPrice: '€ 1,15/kg', total: '€ 5.175,00' },
      { code: 'SBQ-50', description: 'Tondo speciale SBQ ø50 – EN 10060', qty: '3.000 kg', unitPrice: '€ 1,18/kg', total: '€ 3.540,00' },
      { code: 'FPL-100x10', description: 'Piatto 100×10 – EN 10058', qty: '200 kg', unitPrice: '€ 0,975/kg', total: '€ 195,00' },
    ],
    deliveryAddress: 'Via Roma 42, 20121 Milano (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '15 gen', done: true },
      { label: 'In lavorazione', date: '17 gen', done: true },
      { label: 'Pronto per spedizione', date: '22 gen', done: true },
      { label: 'In transito', date: '23 gen', done: true },
      { label: 'Consegnato', date: '25 gen', done: true },
    ],
  },
  {
    id: 'ORD-2023-01204',
    date: '2023-11-22',
    status: 'Consegnato',
    statusColor: 'green',
    total: '€ 19.250,00',
    items: [
      { code: 'IPE-200', description: 'Travi IPE 200 – EN 10365', qty: '11.000 kg', unitPrice: '€ 0,92/kg', total: '€ 10.120,00' },
      { code: 'HEA-160', description: 'Travi HEA 160 – EN 10365', qty: '9.000 kg', unitPrice: '€ 0,975/kg', total: '€ 8.775,00' },
      { code: 'UPN-100', description: 'Profili UPN 100 – EN 10365', qty: '380 kg', unitPrice: '€ 0,94/kg', total: '€ 357,20' },
    ],
    deliveryAddress: 'Via Industriale 15, 20090 Segrate (MI)',
    trackingSteps: [
      { label: 'Ordine ricevuto', date: '22 nov', done: true },
      { label: 'In lavorazione', date: '24 nov', done: true },
      { label: 'Pronto per spedizione', date: '28 nov', done: true },
      { label: 'In transito', date: '29 nov', done: true },
      { label: 'Consegnato', date: '01 dic', done: true },
    ],
  },
]

export const TICKETS = [
  { id: 'TKT-1041', subject: 'Discrepanza quantità – ORD-2024-00891', status: 'Aperto', date: '2024-06-24', priority: 'Media' },
  { id: 'TKT-1038', subject: 'Richiesta certificato qualità IPE 200', status: 'In gestione', date: '2024-06-20', priority: 'Bassa' },
  { id: 'TKT-1029', subject: 'Modifica indirizzo consegna', status: 'Chiuso', date: '2024-06-10', priority: 'Alta' },
]

export const INVOICES = [
  { id: 'FT-2024-00512', orderId: 'ORD-2024-00891', date: '2024-06-23', amount: '€ 18.450,00', status: 'Pagata', due: '2024-08-23' },
  { id: 'FT-2024-00489', orderId: 'ORD-2024-00821', date: '2024-05-30', amount: '€ 6.200,00', status: 'Pagata', due: '2024-07-30' },
  { id: 'FT-2024-00461', orderId: 'ORD-2024-00778', date: '2024-04-28', amount: '€ 31.050,00', status: 'Pagata', due: '2024-06-28' },
]

export const PRODUCTS = [
  {
    category: 'Laminati Mercantili',
    items: [
      { code: 'FPL', name: 'Piatto', norm: 'EN 10058', range: 'da 15×3 a 150×25 mm', chalibria: true },
      { code: 'WFP', name: 'Piatto largo', norm: 'DIN 59200 / EN 10058', range: 'da 160×6 a 400×50 mm', chalibria: true },
      { code: 'ELA', name: 'Angolare ad ali uguali', norm: 'EN 10056-1/2', range: 'da 20×3 a 150×15 mm', chalibria: true },
      { code: 'UEA', name: 'Angolare ad ali disuguali', norm: 'EN 10056-1/2', range: 'da 30×20×4 a 150×100×12 mm', chalibria: false },
      { code: 'TEE', name: 'Profilo a T', norm: 'UNI 5681 / DIN 59051', range: 'da 20×3 a 80×8 mm', chalibria: false },
      { code: 'UPS', name: 'UPS (U stretto)', norm: 'EN 10365 / EN 10279', range: 'da UPS 30 a UPS 100', chalibria: false },
      { code: 'SQB', name: 'Quadro pieno', norm: 'EN 10059', range: 'da 14×14 a 100×100 mm', chalibria: true },
      { code: 'RDB', name: 'Tondo pieno', norm: 'EN 10060', range: 'ø10 – ø100 mm', chalibria: true },
    ],
  },
  {
    category: 'Travi',
    items: [
      { code: 'UPN', name: 'UPN', norm: 'EN 10365 / EN 10279', range: 'UPN 80 – UPN 400', chalibria: true },
      { code: 'UPE', name: 'UPE / UAP', norm: 'EN 10365 / EN 10279', range: 'UPE 80 – UPE 400', chalibria: true },
      { code: 'IPE', name: 'IPE', norm: 'EN 10365 / EN 10034', range: 'IPE 80 – IPE 600', chalibria: true },
      { code: 'IPN', name: 'IPN', norm: 'EN 10365 / EN 10024', range: 'IPN 80 – IPN 550', chalibria: false },
      { code: 'HEA', name: 'HEA / HEB / HEM', norm: 'EN 10365 / EN 10034', range: 'HEA 100 – HEA 1000', chalibria: true },
    ],
  },
  {
    category: 'Acciai per C.A.',
    items: [
      { code: 'TOPAR-B', name: 'TOPAR-S 500C (barre)', norm: 'EN 10080', range: 'ø8 – ø32 mm', chalibria: true },
      { code: 'TOPAR-R', name: 'TOPAR-RC (rotoli)', norm: 'EN 10080', range: 'ø6 – ø16 mm', chalibria: true },
      { code: 'VRG', name: 'Vergella', norm: 'DIN 59110', range: 'ø5,5 – ø16 mm', chalibria: false },
    ],
  },
  {
    category: 'Acciai Speciali',
    items: [
      { code: 'SBQ', name: 'Tondo speciale SBQ', norm: 'EN 10060 / 10308 / 10221', range: 'ø20 – ø63 mm', chalibria: false },
    ],
  },
]

// Extended catalog with price, stock and visual gradient for the product grid
export type StockLevel = 'high' | 'medium' | 'low'
export type CatalogProduct = {
  code: string
  name: string
  fullName: string
  category: string
  norm: string
  range: string
  chalibria: boolean
  price: number   // €/t indicativo
  stock: StockLevel
  gradient: string // CSS gradient simulating steel texture
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // Laminati Mercantili
  { code: 'FPL-20x3', name: 'Piatto 20×3', fullName: 'Piatto 20×3 – EN 10058', category: 'Laminati Mercantili', norm: 'EN 10058', range: '20×3 mm', chalibria: true,  price: 920,  stock: 'high',   gradient: 'linear-gradient(135deg,#8a8a8a 0%,#c0c0c0 40%,#707070 70%,#a0a0a0 100%)' },
  { code: 'FPL-50x6', name: 'Piatto 50×6', fullName: 'Piatto 50×6 – EN 10058', category: 'Laminati Mercantili', norm: 'EN 10058', range: '50×6 mm', chalibria: false, price: 915,  stock: 'medium', gradient: 'linear-gradient(135deg,#909090 0%,#b8b8b8 40%,#686868 70%,#989898 100%)' },
  { code: 'FPL-100x10', name: 'Piatto 100×10', fullName: 'Piatto 100×10 – EN 10058', category: 'Laminati Mercantili', norm: 'EN 10058', range: '100×10 mm', chalibria: true,  price: 905,  stock: 'low',    gradient: 'linear-gradient(135deg,#787878 0%,#b0b0b0 40%,#606060 70%,#909090 100%)' },
  { code: 'ELA-40x4', name: 'Angolare 40×4', fullName: 'Angolare 40×40×4 – EN 10056', category: 'Laminati Mercantili', norm: 'EN 10056-1/2', range: '40×40×4 mm', chalibria: true,  price: 930,  stock: 'high',   gradient: 'linear-gradient(160deg,#6e6e6e 0%,#aeaeae 35%,#888888 65%,#c4c4c4 100%)' },
  { code: 'ELA-60x6', name: 'Angolare 60×6', fullName: 'Angolare 60×60×6 – EN 10056', category: 'Laminati Mercantili', norm: 'EN 10056-1/2', range: '60×60×6 mm', chalibria: true,  price: 925,  stock: 'medium', gradient: 'linear-gradient(160deg,#7a7a7a 0%,#b4b4b4 35%,#808080 65%,#bcbcbc 100%)' },
  { code: 'RDB-20', name: 'Tondo ø20', fullName: 'Tondo pieno ø20 – EN 10060', category: 'Laminati Mercantili', norm: 'EN 10060', range: 'ø20 mm', chalibria: true,  price: 880,  stock: 'high',   gradient: 'radial-gradient(ellipse at 40% 35%,#d0d0d0 0%,#909090 45%,#585858 100%)' },
  { code: 'RDB-30', name: 'Tondo ø30', fullName: 'Tondo pieno ø30 – EN 10060', category: 'Laminati Mercantili', norm: 'EN 10060', range: 'ø30 mm', chalibria: false, price: 878,  stock: 'medium', gradient: 'radial-gradient(ellipse at 40% 35%,#c8c8c8 0%,#888888 45%,#505050 100%)' },
  { code: 'SQB-30', name: 'Quadro 30×30', fullName: 'Quadro pieno 30×30 – EN 10059', category: 'Laminati Mercantili', norm: 'EN 10059', range: '30×30 mm', chalibria: true,  price: 895,  stock: 'low',    gradient: 'linear-gradient(135deg,#808080 0%,#b8b8b8 50%,#686868 100%)' },
  // Travi
  { code: 'IPE-160', name: 'IPE 160', fullName: 'Trave IPE 160 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10034', range: 'IPE 160', chalibria: true,  price: 960,  stock: 'high',   gradient: 'linear-gradient(180deg,#aaaaaa 0%,#787878 30%,#c2c2c2 60%,#888888 100%)' },
  { code: 'IPE-200', name: 'IPE 200', fullName: 'Trave IPE 200 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10034', range: 'IPE 200', chalibria: true,  price: 955,  stock: 'high',   gradient: 'linear-gradient(180deg,#b0b0b0 0%,#808080 30%,#cacaca 60%,#909090 100%)' },
  { code: 'IPE-300', name: 'IPE 300', fullName: 'Trave IPE 300 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10034', range: 'IPE 300', chalibria: true,  price: 950,  stock: 'medium', gradient: 'linear-gradient(180deg,#a8a8a8 0%,#787878 30%,#c0c0c0 60%,#888888 100%)' },
  { code: 'HEA-160', name: 'HEA 160', fullName: 'Trave HEA 160 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10034', range: 'HEA 160', chalibria: true,  price: 975,  stock: 'high',   gradient: 'linear-gradient(170deg,#9a9a9a 0%,#d0d0d0 40%,#707070 75%,#b0b0b0 100%)' },
  { code: 'HEA-200', name: 'HEA 200', fullName: 'Trave HEA 200 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10034', range: 'HEA 200', chalibria: false, price: 970,  stock: 'medium', gradient: 'linear-gradient(170deg,#929292 0%,#c8c8c8 40%,#686868 75%,#a8a8a8 100%)' },
  { code: 'UPN-100', name: 'UPN 100', fullName: 'Profilo UPN 100 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10279', range: 'UPN 100', chalibria: true,  price: 940,  stock: 'low',    gradient: 'linear-gradient(150deg,#888888 0%,#c4c4c4 45%,#707070 80%,#b0b0b0 100%)' },
  { code: 'UPN-200', name: 'UPN 200', fullName: 'Profilo UPN 200 – EN 10365', category: 'Travi', norm: 'EN 10365 / EN 10279', range: 'UPN 200', chalibria: true,  price: 938,  stock: 'high',   gradient: 'linear-gradient(150deg,#909090 0%,#c8c8c8 45%,#787878 80%,#b8b8b8 100%)' },
  // Acciai per C.A.
  { code: 'TOPAR-B-12', name: 'TOPAR-S 500C ø12', fullName: 'Tondo C.A. TOPAR-S 500C ø12 – EN 10080', category: 'Acciai per C.A.', norm: 'EN 10080', range: 'ø12 mm', chalibria: true,  price: 840,  stock: 'high',   gradient: 'repeating-linear-gradient(45deg,#888 0px,#888 4px,#b0b0b0 4px,#b0b0b0 8px)' },
  { code: 'TOPAR-B-16', name: 'TOPAR-S 500C ø16', fullName: 'Tondo C.A. TOPAR-S 500C ø16 – EN 10080', category: 'Acciai per C.A.', norm: 'EN 10080', range: 'ø16 mm', chalibria: true,  price: 842,  stock: 'high',   gradient: 'repeating-linear-gradient(45deg,#808080 0px,#808080 4px,#a8a8a8 4px,#a8a8a8 8px)' },
  { code: 'TOPAR-B-20', name: 'TOPAR-S 500C ø20', fullName: 'Tondo C.A. TOPAR-S 500C ø20 – EN 10080', category: 'Acciai per C.A.', norm: 'EN 10080', range: 'ø20 mm', chalibria: true,  price: 845,  stock: 'medium', gradient: 'repeating-linear-gradient(45deg,#787878 0px,#787878 4px,#a0a0a0 4px,#a0a0a0 8px)' },
  { code: 'TOPAR-B-25', name: 'TOPAR-S 500C ø25', fullName: 'Tondo C.A. TOPAR-S 500C ø25 – EN 10080', category: 'Acciai per C.A.', norm: 'EN 10080', range: 'ø25 mm', chalibria: false, price: 848,  stock: 'low',    gradient: 'repeating-linear-gradient(45deg,#707070 0px,#707070 4px,#989898 4px,#989898 8px)' },
  // Acciai Speciali
  { code: 'SBQ-30', name: 'SBQ ø30', fullName: 'Tondo speciale SBQ ø30 – EN 10060', category: 'Acciai Speciali', norm: 'EN 10060 / 10308', range: 'ø30 mm', chalibria: false, price: 1150, stock: 'medium', gradient: 'linear-gradient(135deg,#5a6a7a 0%,#8a9aaa 40%,#4a5a6a 70%,#7a8a9a 100%)' },
  { code: 'SBQ-50', name: 'SBQ ø50', fullName: 'Tondo speciale SBQ ø50 – EN 10060', category: 'Acciai Speciali', norm: 'EN 10060 / 10308', range: 'ø50 mm', chalibria: false, price: 1180, stock: 'low',    gradient: 'linear-gradient(135deg,#526272 0%,#829292 40%,#425262 70%,#728282 100%)' },
]
