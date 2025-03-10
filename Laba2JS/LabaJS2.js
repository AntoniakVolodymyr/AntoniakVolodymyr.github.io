//1.2.3
let car1 = new Object();
car1.color = "Graphite";
car1.maxSpeed = 400;
car1.driver = new Object();
car1.driver.name = "Volodymyr Antionak";
car1.driver.category = "C";
car1.driver.personal_limitations = "No driving at night";
//1.2.4
let car2 = 
{
    color : "Electric Blue",
    maxSpeed: 999,
    driver:
    {
        name:"Volodymyr Antionak",
        category:"B",
        personal_limitations: null
    },
    tuning: false,
    number_of_accidents:2
}
//1.2.5
car1.drive = function()
{
    console.log("I am not driving at night");
}
console.log("Test task 1.2.5");
car1.drive();
//1.2.6
car2.drive = function()
{
    console.log("I can drive anytime");
}
console.log("Test task 1.2.6");
car2.drive();
//1.2.7
function Truck(color, weight, avgSpeed, brand, model){
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    //1.2.9 
    this.trip = function (){
        if(this.driver == undefined){
            console.log("No driver assigned");
        }
        else{
            console.log(`Driver ${this.driver.name}`);
            if(this.driver.nightDriving == true){
                console.log("drives at night");
            }
            else {
                console.log("does not drive at night");
            }
            console.log(`and has ${this.driver.experience} years of experience`);
        }
    }
}

//1.2.8 
Truck.prototype.AssignDriver = function(name, nightDriving, experience){
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    }
}
//1.2.10 
console.log("Test task 1.2.10");
let truck1 = new Truck("Ice White", 40000, 70, "MAN", "TGX Individual LION");
truck1.AssignDriver("Magnus", true, 10);
truck1.trip();

let truck2 = new Truck("blue", 35000, 75, "Volvo", "FH Euro-5 ADR");
truck2.AssignDriver("Hans", false, 1);
truck2.trip();
//1.2.12
class Square
{
    a = 0;
    //1.2.13
    constructor(a)
    {
        this.a=a;
    }
    //1.2.14
    static help = function()
    {
        console.log("Квадрат - геометрична фігура, яка має 4 рівні сторони, між якими 90 градусів");
        console.log("Square is a regular quadrilateral, which means that it has four straight sides of equal length and four equal angles.");
    }
    //1.2.15
    length()
    {
        console.log(`Сума довжин сторін = ${4*this.a}`);
    }
    square()
    {
        console.log(`Площа квадрата = ${this.a*this.a}`);
    }
    info()
    {
        console.log(`Довжина кожної сторони = ${this.a}`);
        console.log(`Кожен кут має 90 градусів`);
        this.length();
        this.square();
    }
}
//1.2.16 and 1.2.17
class Rectangle extends Square
{
    b = 0;
    constructor(a, b){
        super(a);
        this.b = b;
    }

    static help = function()
    {
        console.log("Прямокутник - геометрична фігура, яка має 4 сторони, між якими кут 90 градусів. Протилежні його сторони є рівні");
        console.log("Rectangle: a quadrilateral with opposite sides equal and all angles 90 degrees.");
    }

    length(){
        console.log(`Сума довжин сторін = ${2*(this.a+this.b)}`);
    }

    square(){
        console.log(`Площа прямокутника = ${this.a*this.b}`);
    }

    info(){
        console.log(`Довжина 2 з 4 сторін = ${this.a}`);
        console.log(`Довжина інших 2 з 4 сторін = ${this.b}`);
        console.log(`Кожен кут має 90 градусів`);
        this.length();
        this.square();
    }
    //1.2.22
    set a(value){
        if(value > 0){
            this._a = value;
        }
        else{
            console.log("Invalid value");
        }
    }

    get a(){
        return super.a;
    }

    set b(value){
        if(value > 0){
            this._b = value;
        }
        else{
            console.log("Invalid value");
        }
    }

    get b(){
        return this.b;
    }
}
//1.2.18 and 1.2.19
class Rhombus extends Square
{
    alpha =0;
    beta =0;
    constructor(a, alpha, beta){
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help = function()
    {
        console.log("Ромб - геометрична фігура, яка має 4 рівні сторони, кут між якими НЕ дорівнює 90 градусів. Протилежні кути рівні");
        console.log("Rhombus is a quadrilateral whose four sides all have the same length. Another name is equilateral quadrilateral, since equilateral means that all of its sides are equal in length. ");
    }

    length(){
        console.log(`Сума довжин сторін = ${4*this.a}`);
    }

    square(){
        console.log(`Площа прямокутника = ${this.a*this.a*Math.sin(this.beta*Math.PI/180)}`);
    }

    info(){
        console.log(`Довжина кожної сторони = ${this.a}`);
        console.log(`Значення 2 з 4 кутів = ${this.alpha}`);
        console.log(`Значення інших 2 з 4 кутів = ${this.beta}`);
        this.length();
        this.square();
    }
}

//1.2.20 and 1.2.21
class Parallelogram extends Rhombus
{
    b=0;
    constructor(a, b, alpha, beta){
        super(a, alpha, beta);
        this.b = b;
    }

    static help = function(){
        console.log("Паралелограм — чотирикутник, протилежні сторони якого попарно паралельні, тобто лежать на паралельних прямих.");
        console.log("Parallelogram  is a simple (non-self-intersecting) quadrilateral with two pairs of parallel sides. The opposite or facing sides of a parallelogram are of equal length and the opposite angles of a parallelogram are of equal measure.")
    }

    length(){
        return 2 * (this.a + this.b);
    }

    square(){
        return this.a * this.b * Math.sin(this.beta * (Math.PI / 180));
    }

    info(){
        console.log(`Довжина 2 з 4 сторін = ${this.a}`);
        console.log(`Довжина інших 2 з 4 сторін = ${this.b}`);
        console.log(`Значення 2 з 4 кутів = ${this.alpha}`);
        console.log(`Значення інших 2 з 4 кутів = ${this.beta}`);
        this.length();
        this.square();
    }
}
//1.2.23
console.log("Test task 1.2.23");
console.log("Test1");
Square.help();
console.log("Test2");
Rectangle.help();  
console.log("Test3");
Rhombus.help();
console.log("Test4");
Parallelogram.help();

//1.2.24
console.log("Test task 1.2.24");
console.log("Test1");
sq = new Square(1);
sq.info();
console.log("Test2");
rec = new Rectangle(1, 2);
rec.info();
console.log("Test3");
rh = new Rhombus(1, 60, 120);
rh.info();
console.log("Test4");
pr = new Parallelogram(1, 3, 60, 120);
pr.info();
//1.2.25
function Triangular(a=3,b=4,c=5){
    return {a,b,c};
}
//1.2.26
tr1 =
{
    a:5,
    b:5,
    c:5
}
tr2 =
{
    a:2,
    b:4,
    c:6
}
tr3 =
{
    a:1,
    b:2,
    c:3
}
console.log("Test task 1.2.26");
tr1= Triangular();
console.log(tr1);
tr2= Triangular(6,8,10);
console.log(tr2);
tr3= Triangular(11,20,11);
console.log(tr3);
//1.2.27
function PiMultiplier(x){
    function Pi(x1){
        return x1 * x;
    }
   return Pi;
}
//1.2.28
console.log("Test task 1.2.28");
let num1 = PiMultiplier(Math.PI);
console.log(num1(2));
let num2 = PiMultiplier(Math.PI);
console.log(num2(2/3));
let num3 = PiMultiplier(Math.PI);
console.log(num3(0.5));
//1.2.29
function Painter(color){
    let Output = function(Object){
        if(Object.type == undefined){
            console.log("No ‘type’ property occurred!")
        }
        else console.log(`Object type is ${Object.type} and color is ${color}`);
    }
    return Output;
}

//1.2.30 
let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");
//1.2.31
console.log("Test task 1.2.31")

object1 = {maxSpeed: 280, type: "Sportcar", color : "magenta"}
object2 = {type: "Truck", avg_speed: 90, load_capacity: 2400}
object3 = {maxSpeed: 180, color: "purple", isCar: true}

PaintBlue(object1);
PaintRed(object2);
PaintYellow(object3);