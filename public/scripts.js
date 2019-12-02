$(document).ready(function() {

    let arrayData = []

    $.get("/", function(data) {
        let retailers = {}
        data.forEach((product) => {
            let shop = product['Retailer Name'];
            retailers[shop] = shop;
        });
        let shopNmes = Object.keys(retailers);
        shopNmes.forEach((retail) => {
            $("#productRetails").append(`<option value="${retail}">${retail}</option>`)
        })

    });

    $('#productRetails').on('change', function() {

        let retailers = {}
        let modelNumbers = [];
        let thebrands = []
        let inputMod = document.querySelectorAll(".contain input")[0];
        let inputBrand = document.querySelectorAll(".contain input")[1];

        inputMod.value = null;
        inputBrand.value = null;

        $.get("/retailer/" + this.value, function(data) {
            data.forEach((product) => {
                let shop = product['Retailer Name'];

                let themodels = product['Brand Model'];
                modelNumbers.push(themodels);

                let brnd = product['Brand Name'];
                thebrands.push(brnd)

                //console.log(shop + "-------" + themodels);

            });
            console.log(modelNumbers);
        });

        autocomplete(inputMod, inputBrand, modelNumbers, thebrands);
    });


    function autocomplete(inp, inplabel, arrmodel, arrbrands) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arrmodel.length; i++) {
                /*Pick the Brand*/
                let lblbrand = arrbrands[i];
                /*check if the item starts with the same letters as the text field value:*/
                if (arrmodel[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                      let posindex = arrmodel[i].toUpperCase().indexOf(val.toUpperCase());
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    arrmodel[i].substr(0, val.length).toUpperCase() ==! val.toUpperCase()?
                     b.innerHTML = lblbrand.toUpperCase() + "  "+ arrmodel[i].substr(0,pos) + "<strong>" + arrmodel[i].substr(pos, val.length) + "</strong>"
                    : b.innerHTML = lblbrand.toUpperCase() + "  " + "<strong>" + arrmodel[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arrmodel[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arrmodel[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;

                        inplabel.value = lblbrand.toUpperCase();
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function(e) {
            closeAllLists(e.target);
        });
    }

});