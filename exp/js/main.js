$(document).ready(function(){
   $(".read").click(function(){
      $(this).prev().toggle();
      $(this).siblings('.dots').toggle();
      if($(this).text()=='read more'){
	$(this).text('read less');
      }
      else{
	$(this).text('read more');
      }
   });
});

function courseLevel(){
          var a= document.getElementById("input").value;
              if(a==="select course"){
            var arr=["select level"];
              }
              else if(a==="Spanish"){
            var arr=["select level","A1(iniciación)", "A2(básico)", "B1(intermedio)", "B2(intermedio alto)", "C1(avanzado)", "C2(muy avanzado)"];
              }
              else if(a==="Japanese"){
            var arr=["select level","A1(入門)", "A2(N5)", "B1(N4)", "B2(N3)", "C1(N2)", "C2(N1)"];
                    }
              else if(a==="English"){
            var arr=["select level","A1(introductory)", "A2(basic)", "B1(intermediate)", "B2(upper-intermediate)", "C1(advanced)", "C2(very advanced)"];
                      }
              else if(a==="Piano"){
            var arr=["select level","Beginner", "Basic"];
                      }
              else
            var string="";

            for(i=0;i<arr.length;i++){
              string=string+"<option value="+arr[i]+">"+arr[i]+"</option>";
            }
            document.getElementById("output").innerHTML=string;

            }

function levelModality(){
  var a= document.getElementById("output").value;
    if (a==="select level"){
      var arr=["select modality"];
    }
    else {
var arr=["select modality", "Online", "Stationary"];
    }
var string="";
for(i=0;i<arr.length;i++){
  string=string+"<option value="+arr[i]+">"+arr[i]+"</option>";
    }
    document.getElementById("output2").innerHTML=string;
}

function courseRedirect(){
var a= document.getElementById("output2").value;
var b= document.getElementById("output").value;

if (a==="select level" & b==="select course"){
  var arr=["select modality"];
}

else if(a==="Online" && b==="A1(iniciación)"){
location.replace("a1-iniciacion.html")
}
else if(a==="Stationary" && b==="A1(iniciación)"){
location.replace("a1-iniciacion2.html")
}

else if(a==="Online" && b==="A2(básico)"){
location.replace("a2-basico.html")
}
else if(a==="Stationary" && b==="A2(básico)"){
location.replace("a2-basico2.html")
}

else if(a==="Online" && b==="B1(intermedio)"){
location.replace("b1-intermedio.html")
}
else if(a==="Stationary" && b==="B1(intermedio)"){
location.replace("b1-intermedio2.html")
}

else if(a==="Online" && b==="B2(intermedio alto)"){
location.replace("b2-intermedioalto.html")
}
else if(a==="Stationary" && b==="B2(intermedio alto)"){
location.replace("b2-intermedioalto2.html")
}

else if(a==="Online" && b==="C1(avanzado)"){
location.replace("c1-avanzado.html")
}
else if(a==="Stationary" && b==="C1(avanzado)"){
location.replace("c1-avanzado2.html")
}

else if(a==="Online" && b==="C2(muy avanzado)"){
location.replace("c2-muyavanzado.html")
}
else if(a==="Stationary" && b==="C2(muy avanzado)"){
location.replace("c2-muyavanzado2.html")
}

else if(a==="Online" && b==="A1(introductory)"){
location.replace("a1-introductory.html")
}
else if(a==="Stationary" && b==="A1(introductory)"){
location.replace("a1-introductory2.html")
}

else if(a==="Online" && b==="A2(basic)"){
location.replace("a2-basic.html")
}
else if(a==="Stationary" && b==="A2(basic)"){
location.replace("a2-basic2.html")
}

else if(a==="Online" && b==="B1(intermediate)"){
location.replace("b1-intermediate.html")
}
else if(a==="Stationary" && b==="B1(intermediate)"){
location.replace("b1-intermediate2.html")
}

else if(a==="Online" && b==="B2(upper-intermediate)"){
location.replace("b2-upperintermediate.html")
}
else if(a==="Stationary" && b==="B2(upper-intermediate)"){
location.replace("b2-upperintermediate2.html")
}

else if(a==="Online" && b==="C1(advanced)"){
location.replace("c1-advanced.html")
}
else if(a==="Stationary" && b==="C1(advanced)"){
location.replace("c1-advanced2.html")
}

else if(a==="Online" && b==="C2(very advanced)"){
location.replace("c2-veryadvanced.html")
}
else if(a==="Stationary" && b==="C2(very advanced)"){
location.replace("c2-veryadvanced2.html")
}

else if(a==="Online" && b==="A1(入門)"){
location.replace("a1-nyuumon.html")
}
else if(a==="Stationary" && b==="A1(入門)"){
location.replace("a1-nyuumon2.html")
}

else if(a==="Online" && b==="A2(N5)"){
location.replace("a2-n5.html")
}
else if(a==="Stationary" && b==="A2(N5)"){
location.replace("a2-n52.html")
}

else if(a==="Online" && b==="B1(N4)"){
location.replace("b1-n4.html")
}
else if(a==="Stationary" && b==="B1(N4)"){
location.replace("b1-n42.html")
}

else if(a==="Online" && b==="B2(N3)"){
location.replace("b2-n3.html")
}
else if(a==="Stationary" && b==="B2(N3)"){
location.replace("b2-n32.html")
}

else if(a==="Online" && b==="C1(N2)"){
location.replace("c1-n2.html")
}
else if(a==="Stationary" && b==="C1(N2)"){
location.replace("c1-n22.html")
}

else if(a==="Online" && b==="C2(N1)"){
location.replace("c2-n1.html")
}
else if(a==="Stationary" && b==="C2(N1)"){
location.replace("c2-n12.html")
}

else if(a==="Online" && b==="Beginner"){
location.replace("beginner.html")
}
else if(a==="Stationary" && b==="Beginner"){
location.replace("beginner2.html")
}

else if(a==="Online" && b==="Intermediate"){
location.replace("basic.html")
}
else if(a==="Stationary" && b==="Intermediate"){
location.replace("basic2.html")
}



  else
  var string="";

  for(i=0;i<arr.length;i++){
    string=string+"<option value="+arr[i]+">"+arr[i]+"</option>";
}
document.getElementById("output2").innerHTML=string;

}


function toggleContent1() {
  // Get the DOM reference
  var contentId = document.getElementById("content1");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}


function toggleContent2() {
  // Get the DOM reference
  var contentId = document.getElementById("content2");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent3() {
  // Get the DOM reference
  var contentId = document.getElementById("content3");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent4() {
  // Get the DOM reference
  var contentId = document.getElementById("content4");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent5() {
  // Get the DOM reference
  var contentId = document.getElementById("content5");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent6() {
  // Get the DOM reference
  var contentId = document.getElementById("content6");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent7() {
  // Get the DOM reference
  var contentId = document.getElementById("content7");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent8() {
  // Get the DOM reference
  var contentId = document.getElementById("content8");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent9() {
  // Get the DOM reference
  var contentId = document.getElementById("content9");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent10() {
  // Get the DOM reference
  var contentId = document.getElementById("content10");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent11() {
  // Get the DOM reference
  var contentId = document.getElementById("content11");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent12() {
  // Get the DOM reference
  var contentId = document.getElementById("content12");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent13() {
  // Get the DOM reference
  var contentId = document.getElementById("content13");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent14() {
  // Get the DOM reference
  var contentId = document.getElementById("content14");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent15() {
  // Get the DOM reference
  var contentId = document.getElementById("content15");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent16() {
  // Get the DOM reference
  var contentId = document.getElementById("content16");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent17() {
  // Get the DOM reference
  var contentId = document.getElementById("content17");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent18() {
  // Get the DOM reference
  var contentId = document.getElementById("content18");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent19() {
  // Get the DOM reference
  var contentId = document.getElementById("content19");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent20() {
  // Get the DOM reference
  var contentId = document.getElementById("content20");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent21() {
  // Get the DOM reference
  var contentId = document.getElementById("content21");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent22() {
  // Get the DOM reference
  var contentId = document.getElementById("content22");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent23() {
  // Get the DOM reference
  var contentId = document.getElementById("content23");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent24() {
  // Get the DOM reference
  var contentId = document.getElementById("content24");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent25() {
  // Get the DOM reference
  var contentId = document.getElementById("content25");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent26() {
  // Get the DOM reference
  var contentId = document.getElementById("content26");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent27() {
  // Get the DOM reference
  var contentId = document.getElementById("content27");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent28() {
  // Get the DOM reference
  var contentId = document.getElementById("content28");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent29() {
  // Get the DOM reference
  var contentId = document.getElementById("content29");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent30() {
  // Get the DOM reference
  var contentId = document.getElementById("content30");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent31() {
  // Get the DOM reference
  var contentId = document.getElementById("content31");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent32() {
  // Get the DOM reference
  var contentId = document.getElementById("content32");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent33() {
  // Get the DOM reference
  var contentId = document.getElementById("content33");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent34() {
  // Get the DOM reference
  var contentId = document.getElementById("content34");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent35() {
  // Get the DOM reference
  var contentId = document.getElementById("content35");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent36() {
  // Get the DOM reference
  var contentId = document.getElementById("content36");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent37() {
  // Get the DOM reference
  var contentId = document.getElementById("content37");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent38() {
  // Get the DOM reference
  var contentId = document.getElementById("content38");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent39() {
  // Get the DOM reference
  var contentId = document.getElementById("content39");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent40() {
  // Get the DOM reference
  var contentId = document.getElementById("content40");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent41() {
  // Get the DOM reference
  var contentId = document.getElementById("content41");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent42() {
  // Get the DOM reference
  var contentId = document.getElementById("content42");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent43() {
  // Get the DOM reference
  var contentId = document.getElementById("content43");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent44() {
  // Get the DOM reference
  var contentId = document.getElementById("content44");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent45() {
  // Get the DOM reference
  var contentId = document.getElementById("content45");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent46() {
  // Get the DOM reference
  var contentId = document.getElementById("content46");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent47() {
  // Get the DOM reference
  var contentId = document.getElementById("content47");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent48() {
  // Get the DOM reference
  var contentId = document.getElementById("content48");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent49() {
  // Get the DOM reference
  var contentId = document.getElementById("content49");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent50() {
  // Get the DOM reference
  var contentId = document.getElementById("content50");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent51() {
  // Get the DOM reference
  var contentId = document.getElementById("content51");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent52() {
  // Get the DOM reference
  var contentId = document.getElementById("content52");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent53() {
  // Get the DOM reference
  var contentId = document.getElementById("content53");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent54() {
  // Get the DOM reference
  var contentId = document.getElementById("content54");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent55() {
  // Get the DOM reference
  var contentId = document.getElementById("content55");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent56() {
  // Get the DOM reference
  var contentId = document.getElementById("content56");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent57() {
  // Get the DOM reference
  var contentId = document.getElementById("content57");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}
function toggleContent58() {
  // Get the DOM reference
  var contentId = document.getElementById("content58");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block";
}

function toggleContent59() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaA1o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent60() {
  // Get the DOM reference
  var contentId = document.getElementById("content60");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent61() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaA1s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent62() {
  // Get the DOM reference
  var contentId = document.getElementById("content62");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent63() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaA2o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent64() {
  // Get the DOM reference
  var contentId = document.getElementById("content64");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent65() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaA2s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent66() {
  // Get the DOM reference
  var contentId = document.getElementById("content66");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent67() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaB1o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent68() {
  // Get the DOM reference
  var contentId = document.getElementById("content68");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent69() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaB1s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent70() {
  // Get the DOM reference
  var contentId = document.getElementById("content70");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent71() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaB2o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent72() {
  // Get the DOM reference
  var contentId = document.getElementById("content72");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent73() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaB2s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent74() {
  // Get the DOM reference
  var contentId = document.getElementById("content74");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent75() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaC1o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent76() {
  // Get the DOM reference
  var contentId = document.getElementById("content76");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent77() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaC1s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent78() {
  // Get the DOM reference
  var contentId = document.getElementById("content78");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent79() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaC2o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent80aaa() {
  // Get the DOM reference
  var contentId = document.getElementById("content80aa");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent81() {
  // Get the DOM reference
  var contentId = document.getElementById("form-spaC2s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent82() {
  // Get the DOM reference
  var contentId = document.getElementById("content82");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent83() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japN6o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent84() {
  // Get the DOM reference
  var contentId = document.getElementById("content84");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent85() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japA1o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent86() {
  // Get the DOM reference
  var contentId = document.getElementById("content86");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent87() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japA1s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent88() {
  // Get the DOM reference
  var contentId = document.getElementById("content88");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent89() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japA2o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent90() {
  // Get the DOM reference
  var contentId = document.getElementById("content90");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent91() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japA2s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent92() {
  // Get the DOM reference
  var contentId = document.getElementById("content92");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent93() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japB1o");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent94() {
  // Get the DOM reference
  var contentId = document.getElementById("content94");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
function toggleContent95() {
  // Get the DOM reference
  var contentId = document.getElementById("form-japB1s");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 200);
}

function toggleContent96() {
  // Get the DOM reference
  var contentId = document.getElementById("content96");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}

function toggleContent97() {
  // Get the DOM reference
  var contentId = document.getElementById("content97");
  // Toggle
  contentId.style.display == "block" ? contentId.style.display = "none" :
contentId.style.display = "block"; window.scrollBy(0, 150);
}
