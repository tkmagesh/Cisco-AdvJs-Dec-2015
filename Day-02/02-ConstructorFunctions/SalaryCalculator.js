/*Create a SalaryCalculator 'class' that has the following attributes
    - basic
    - hra
    - da
    - tax
    - salary

    Note : tax - percentage, salary is initialize with 0

    - calculate()
        calculate the salary and update the 'salary' attribute accordingly

    Usage :
    var calc = new SalaryCalculator(10000,2000,3000,10)
    calc.salary //=> 0;
    calc.calcuate();
    calc.salary //=> 13500;
*/

function SalaryCalculator(basic, hra, da, tax){
    this.basic = basic;
    this.hra = hra;
    this.da = da;
    this.tax = tax;
    this.salary = 0;
}
SalaryCalculator.prototype.calculate = function(){
        var gross = this.basic + this.hra + this.da;
        this.salary = gross * ((100-this.tax)/100);
    }
