        
    function ElementFormulaire() {
      this.InputCheckbox = function (idInput) {
        var input = document.getElementById(idInput);
        return input.checked;
      };
      this.InputInt = function (idInput) {
        var input = document.getElementById(idInput);
        return parseInt(input.value);
      };
    }
     
    function ElementResultat() {
      this.Tag = function (idTag, value) {
        var tag = document.getElementById(idTag);
        if (tag !== null) {
          tag.innerHTML = value;
        }
      };
      this.TagMontant = function (idTag, value) {
		var val = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
        this.Tag(idTag, val);
      };
    }
     
    function CalculSalaire() {
      const pct_taxe = 0.12;
      const pct_assurance = 0.07;
      const bonus = 100;
      const allocation = 150;
      this.salaireBrut;
      this.isBonus;
	  this.isAllocation;
      this.allocationCalculee;
      this.persACharge;
      this.getSupplement = function () {
        var supplement = 0;
        if (this.isBonus === true) {
          supplement += bonus;
        }
        if (this.isAllocation === true) {
          supplement += allocation;
        }
        return supplement;
      };
      
      this.getAssurance = function () {
        return this.salaireBrut * pct_assurance;
      };
	  this.getTaxeCalculee = function () {
        var pctTaxeCalcule = pct_taxe;
        if (this.persACharge >= 3) {
          pctTaxeCalcule -= 0.01;
		}
        return this.salaireBrut * pctTaxeCalcule;
      };
	   this.getSalaireNet = function () {
        return this.salaireBrut - this.getAssurance() - this.getTaxeCalculee() + this.getSupplement();
      }; 
    }
     
    function calculerSalaireNet() {
      const elemForm = new ElementFormulaire();
      const elemResult = new ElementResultat();
      const salCalc = new CalculSalaire();
      salCalc.salaireBrut = elemForm.InputInt('salaireBrut');
      salCalc.isBonus = elemForm.InputCheckbox('bonus');
      salCalc.isAllocation = elemForm.InputCheckbox('allocation');
      salCalc.persACharge = elemForm.InputInt('persACharge');
	  elemResult.TagMontant('salaireBrutFinal', salCalc.salaireBrut);
      elemResult.TagMontant('taxeCalculee', salCalc.getTaxeCalculee());
      elemResult.TagMontant('assuranceCalculee', salCalc.getAssurance());
	  elemResult.TagMontant('bonusCalcule', salCalc.getSupplement());
      elemResult.TagMontant('salaireNet', salCalc.getSalaireNet());
    }
     
    function effacer() {
      const elemResult = new ElementResultat();
      const ids = ['salaireBrutFinal','taxeCalculee', 'assuranceCalculee', 'bonusCalcule', 'salaireNet'];
      for (var i = 0; i < ids.length; i++) {
        elemResult.Tag(ids[i], '');
      }
    }