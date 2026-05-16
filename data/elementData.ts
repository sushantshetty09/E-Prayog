export interface ElementData {
  number: number; symbol: string; name: string;
  group: number; period: number; category: string;
  mass: number; state: string;
  config: string; block: string;
  shells: number[];
  ions: { formula: string; name: string }[];
}

const E = (number:number,symbol:string,name:string,group:number,period:number,category:string,mass:number,state:string,config:string,block:string,shells:number[],ions:{formula:string;name:string}[]):ElementData =>
  ({number,symbol,name,group,period,category,mass,state,config,block,shells,ions});

export const ELEMENT_DATA: ElementData[] = [
  E(1,'H','Hydrogen',1,1,'nonmetal',1.008,'Gas','1s¹','s',[1],[]),
  E(2,'He','Helium',18,1,'noble-gas',4.003,'Gas','1s²','s',[2],[]),
  E(3,'Li','Lithium',1,2,'alkali-metal',6.94,'Solid','[He] 2s¹','s',[2,1],[{formula:'Li⁺',name:'Lithium(I)'}]),
  E(4,'Be','Beryllium',2,2,'alkaline-earth-metal',9.012,'Solid','[He] 2s²','s',[2,2],[{formula:'Be²⁺',name:'Beryllium(II)'}]),
  E(5,'B','Boron',13,2,'metalloid',10.81,'Solid','[He] 2s² 2p¹','p',[2,3],[{formula:'B³⁺',name:'Boron(III)'}]),
  E(6,'C','Carbon',14,2,'nonmetal',12.011,'Solid','[He] 2s² 2p²','p',[2,4],[]),
  E(7,'N','Nitrogen',15,2,'nonmetal',14.007,'Gas','[He] 2s² 2p³','p',[2,5],[{formula:'N³⁻',name:'Nitride'}]),
  E(8,'O','Oxygen',16,2,'nonmetal',15.999,'Gas','[He] 2s² 2p⁴','p',[2,6],[{formula:'O²⁻',name:'Oxide'}]),
  E(9,'F','Fluorine',17,2,'halogen',18.998,'Gas','[He] 2s² 2p⁵','p',[2,7],[{formula:'F⁻',name:'Fluoride'}]),
  E(10,'Ne','Neon',18,2,'noble-gas',20.18,'Gas','[He] 2s² 2p⁶','p',[2,8],[]),
  E(11,'Na','Sodium',1,3,'alkali-metal',22.99,'Solid','[Ne] 3s¹','s',[2,8,1],[{formula:'Na⁺',name:'Sodium(I)'}]),
  E(12,'Mg','Magnesium',2,3,'alkaline-earth-metal',24.305,'Solid','[Ne] 3s²','s',[2,8,2],[{formula:'Mg²⁺',name:'Magnesium(II)'}]),
  E(13,'Al','Aluminium',13,3,'post-transition-metal',26.982,'Solid','[Ne] 3s² 3p¹','p',[2,8,3],[{formula:'Al³⁺',name:'Aluminium(III)'}]),
  E(14,'Si','Silicon',14,3,'metalloid',28.085,'Solid','[Ne] 3s² 3p²','p',[2,8,4],[{formula:'Si⁴⁺',name:'Silicon(IV)'}]),
  E(15,'P','Phosphorus',15,3,'nonmetal',30.974,'Solid','[Ne] 3s² 3p³','p',[2,8,5],[{formula:'P³⁻',name:'Phosphide'}]),
  E(16,'S','Sulfur',16,3,'nonmetal',32.06,'Solid','[Ne] 3s² 3p⁴','p',[2,8,6],[{formula:'S²⁻',name:'Sulfide'}]),
  E(17,'Cl','Chlorine',17,3,'halogen',35.45,'Gas','[Ne] 3s² 3p⁵','p',[2,8,7],[{formula:'Cl⁻',name:'Chloride'}]),
  E(18,'Ar','Argon',18,3,'noble-gas',39.95,'Gas','[Ne] 3s² 3p⁶','p',[2,8,8],[]),
  E(19,'K','Potassium',1,4,'alkali-metal',39.098,'Solid','[Ar] 4s¹','s',[2,8,8,1],[{formula:'K⁺',name:'Potassium(I)'}]),
  E(20,'Ca','Calcium',2,4,'alkaline-earth-metal',40.078,'Solid','[Ar] 4s²','s',[2,8,8,2],[{formula:'Ca²⁺',name:'Calcium(II)'}]),
  E(21,'Sc','Scandium',3,4,'transition-metal',44.956,'Solid','[Ar] 3d¹ 4s²','d',[2,8,9,2],[{formula:'Sc³⁺',name:'Scandium(III)'}]),
  E(22,'Ti','Titanium',4,4,'transition-metal',47.867,'Solid','[Ar] 3d² 4s²','d',[2,8,10,2],[{formula:'Ti²⁺',name:'Titanium(II)'},{formula:'Ti⁴⁺',name:'Titanium(IV)'}]),
  E(23,'V','Vanadium',5,4,'transition-metal',50.942,'Solid','[Ar] 3d³ 4s²','d',[2,8,11,2],[{formula:'V²⁺',name:'Vanadium(II)'},{formula:'V⁵⁺',name:'Vanadium(V)'}]),
  E(24,'Cr','Chromium',6,4,'transition-metal',51.996,'Solid','[Ar] 3d⁵ 4s¹','d',[2,8,13,1],[{formula:'Cr²⁺',name:'Chromium(II)'},{formula:'Cr³⁺',name:'Chromium(III)'}]),
  E(25,'Mn','Manganese',7,4,'transition-metal',54.938,'Solid','[Ar] 3d⁵ 4s²','d',[2,8,13,2],[{formula:'Mn²⁺',name:'Manganese(II)'},{formula:'Mn⁴⁺',name:'Manganese(IV)'},{formula:'Mn⁷⁺',name:'Manganese(VII)'}]),
  E(26,'Fe','Iron',8,4,'transition-metal',55.845,'Solid','[Ar] 3d⁶ 4s²','d',[2,8,14,2],[{formula:'Fe²⁺',name:'Iron(II)'},{formula:'Fe³⁺',name:'Iron(III)'}]),
  E(27,'Co','Cobalt',9,4,'transition-metal',58.933,'Solid','[Ar] 3d⁷ 4s²','d',[2,8,15,2],[{formula:'Co²⁺',name:'Cobalt(II)'},{formula:'Co³⁺',name:'Cobalt(III)'}]),
  E(28,'Ni','Nickel',10,4,'transition-metal',58.693,'Solid','[Ar] 3d⁸ 4s²','d',[2,8,16,2],[{formula:'Ni²⁺',name:'Nickel(II)'},{formula:'Ni³⁺',name:'Nickel(III)'}]),
  E(29,'Cu','Copper',11,4,'transition-metal',63.546,'Solid','[Ar] 3d¹⁰ 4s¹','d',[2,8,18,1],[{formula:'Cu⁺',name:'Copper(I)'},{formula:'Cu²⁺',name:'Copper(II)'}]),
  E(30,'Zn','Zinc',12,4,'transition-metal',65.38,'Solid','[Ar] 3d¹⁰ 4s²','d',[2,8,18,2],[{formula:'Zn²⁺',name:'Zinc(II)'}]),
  E(31,'Ga','Gallium',13,4,'post-transition-metal',69.723,'Solid','[Ar] 3d¹⁰ 4s² 4p¹','p',[2,8,18,3],[{formula:'Ga³⁺',name:'Gallium(III)'}]),
  E(32,'Ge','Germanium',14,4,'metalloid',72.63,'Solid','[Ar] 3d¹⁰ 4s² 4p²','p',[2,8,18,4],[{formula:'Ge²⁺',name:'Germanium(II)'},{formula:'Ge⁴⁺',name:'Germanium(IV)'}]),
  E(33,'As','Arsenic',15,4,'metalloid',74.922,'Solid','[Ar] 3d¹⁰ 4s² 4p³','p',[2,8,18,5],[{formula:'As³⁻',name:'Arsenide'}]),
  E(34,'Se','Selenium',16,4,'nonmetal',78.971,'Solid','[Ar] 3d¹⁰ 4s² 4p⁴','p',[2,8,18,6],[{formula:'Se²⁻',name:'Selenide'}]),
  E(35,'Br','Bromine',17,4,'halogen',79.904,'Liquid','[Ar] 3d¹⁰ 4s² 4p⁵','p',[2,8,18,7],[{formula:'Br⁻',name:'Bromide'}]),
  E(36,'Kr','Krypton',18,4,'noble-gas',83.798,'Gas','[Ar] 3d¹⁰ 4s² 4p⁶','p',[2,8,18,8],[]),
  E(37,'Rb','Rubidium',1,5,'alkali-metal',85.468,'Solid','[Kr] 5s¹','s',[2,8,18,8,1],[{formula:'Rb⁺',name:'Rubidium(I)'}]),
  E(38,'Sr','Strontium',2,5,'alkaline-earth-metal',87.62,'Solid','[Kr] 5s²','s',[2,8,18,8,2],[{formula:'Sr²⁺',name:'Strontium(II)'}]),
  E(47,'Ag','Silver',11,5,'transition-metal',107.87,'Solid','[Kr] 4d¹⁰ 5s¹','d',[2,8,18,18,1],[{formula:'Ag⁺',name:'Silver(I)'}]),
  E(50,'Sn','Tin',14,5,'post-transition-metal',118.71,'Solid','[Kr] 4d¹⁰ 5s² 5p²','p',[2,8,18,18,4],[{formula:'Sn²⁺',name:'Tin(II)'},{formula:'Sn⁴⁺',name:'Tin(IV)'}]),
  E(53,'I','Iodine',17,5,'halogen',126.9,'Solid','[Kr] 4d¹⁰ 5s² 5p⁵','p',[2,8,18,18,7],[{formula:'I⁻',name:'Iodide'}]),
  E(54,'Xe','Xenon',18,5,'noble-gas',131.29,'Gas','[Kr] 4d¹⁰ 5s² 5p⁶','p',[2,8,18,18,8],[]),
  E(55,'Cs','Cesium',1,6,'alkali-metal',132.91,'Solid','[Xe] 6s¹','s',[2,8,18,18,8,1],[{formula:'Cs⁺',name:'Cesium(I)'}]),
  E(56,'Ba','Barium',2,6,'alkaline-earth-metal',137.33,'Solid','[Xe] 6s²','s',[2,8,18,18,8,2],[{formula:'Ba²⁺',name:'Barium(II)'}]),
  E(79,'Au','Gold',11,6,'transition-metal',196.97,'Solid','[Xe] 4f¹⁴ 5d¹⁰ 6s¹','d',[2,8,18,32,18,1],[{formula:'Au⁺',name:'Gold(I)'},{formula:'Au³⁺',name:'Gold(III)'}]),
  E(80,'Hg','Mercury',12,6,'transition-metal',200.59,'Liquid','[Xe] 4f¹⁴ 5d¹⁰ 6s²','d',[2,8,18,32,18,2],[{formula:'Hg⁺',name:'Mercury(I)'},{formula:'Hg²⁺',name:'Mercury(II)'}]),
  E(82,'Pb','Lead',14,6,'post-transition-metal',207.2,'Solid','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²','p',[2,8,18,32,18,4],[{formula:'Pb²⁺',name:'Lead(II)'},{formula:'Pb⁴⁺',name:'Lead(IV)'}]),
  E(86,'Rn','Radon',18,6,'noble-gas',222,'Gas','[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶','p',[2,8,18,32,18,8],[]),
  E(87,'Fr','Francium',1,7,'alkali-metal',223,'Solid','[Rn] 7s¹','s',[2,8,18,32,18,8,1],[{formula:'Fr⁺',name:'Francium(I)'}]),
  E(88,'Ra','Radium',2,7,'alkaline-earth-metal',226,'Solid','[Rn] 7s²','s',[2,8,18,32,18,8,2],[{formula:'Ra²⁺',name:'Radium(II)'}]),
  E(118,'Og','Oganesson',18,7,'noble-gas',294,'Solid','[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶','p',[2,8,18,32,32,18,8],[]),
];

export const ELEMENT_MAP = new Map<number, ElementData>(ELEMENT_DATA.map(e => [e.number, e]));
