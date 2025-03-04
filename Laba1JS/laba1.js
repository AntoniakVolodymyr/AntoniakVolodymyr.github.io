console.log("Як використовувати команду: triangle(value1, type1, value2, type2)");
console.log("Можливі типи:")
console.log("Сторони трикутника:'leg' (катет), 'hypotenuse' (гіпотенуза),");
console.log("Кути трикутника:'adjacent angle' (прилеглий кут до катета),")
console.log("'opposite angle' (протилежний від катета кут), 'angle' (один з кутів при гіпотенузі).");
console.log("!!!ВАЖЛИВЕ УТОЧНЕННЯ, ВСІ ЗНАЧЕННЯ МАЮТЬ БУТИ ДОДАТНІ І ДІЙСНІ!!!!")
function triangle(value1, type1, value2, type2) {
  let a, b, c, alpha, beta;

  if (value1 <= 0 || value2 <= 0) 
    {
    return "Помилка: Значення мають бути більші за 0";
  }
//для 2 катетів
  if (type1 === "leg" && type2 === "leg") 
    {
    a = value1;
    b = value2;
    c = Math.sqrt(a * a + b * b);

    alpha = Math.asin(a / c) * (180 / Math.PI);
    beta = 90 - alpha;
  } 
  //катет і гіпотенуза
  else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) 
    {
    if(type1==="leg")
    {
      a=value1;
      c=value2;
    }
    else
    {
      a=value2;
      c=value1;
    }

    if (a >= c) return "Помилка: Катет не може бути більшим або рівним за гіпотенузу.";

    b = Math.sqrt(c * c - a * a);

    alpha = Math.asin(a / c) * (180 / Math.PI);
    beta = 90 - alpha;
  } 
  //гіпотенуза і кут при ній
  else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) 
    {
    if(type1==="hypotenuse")
      {
        alpha=value2;
        c=value1;
      }
      else
      {
        alpha=value1;
        c=value2;
      }

    if (alpha <= 0 || alpha >= 90) return "Помилка: Гострий кут має бути між 0 і 90 градусами.";

    let rad = alpha * (Math.PI / 180);
    a = c * Math.sin(rad);
    b = c * Math.cos(rad);
    beta = 90 - alpha;
  } 
  //катет і протилежний кут
  else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) 
    {
    if(type1==="leg")
      {
        a=value1;
        alpha=value2;
      }
      else
      {
        alpha=value1;
        a=value2;
      }

    if (alpha <= 0 || alpha >= 90) return "Помилка: Гострий кут має бути між 0 і 90 градусами.";

    let rad = alpha * (Math.PI / 180);
    c = a / Math.sin(rad);
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  } 
  //катет і прилеглий кут
  else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) 
     {
    if(type1==="leg")
      {
        b=value1;
        beta=value2;
      }
      else
      {
        b=value2;
        beta=value1;
      }

    if (beta <= 0 || beta >= 90) return "Помилка: Гострий кут має бути між 0 і 90 градусами.";

    let rad = beta * (Math.PI / 180);
    c = b / Math.cos(rad);
    a = Math.sqrt(c * c - b * b);
    alpha = 90 - beta;
  } 
  else {
    return "Помилка: Неправильні типи аргументів. Перевірте інструкцію.";
  }

  // Округлення кутів до 2 знаків після коми
  alpha = Number(alpha.toFixed(2));
  beta = Number((90 - alpha).toFixed(2)); 
  if (alpha <= 0 || alpha >= 90 || beta <= 0 || beta >= 90) {
    console.error("Помилка: Вийшов трикутник з неможливими властивостями. Поміняйте введені значення на більш реальні");
    return;
}

  console.log(`Сторони трикутника: a = ${a}, b = ${b}, c = ${c}`);
  console.log(`Кути трикутника: alpha = ${alpha}, beta = ${beta}`);
  
  return "done";
}
