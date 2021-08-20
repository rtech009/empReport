sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller , UIComponent) {
	"use strict";

	return Controller.extend("employeelr.controller.Details", {

		onInit: function () {
                 var oRouter = UIComponent.getRouterFor(this);
                 oRouter.getRoute("Detail").attachPatternMatched(this.onRouteMatched, this);
        },
        
        onNavBack: function () {
    var oHistory = sap.ui.core.routing.History.getInstance();
    var sPreviousHash = oHistory.getPreviousHash();

    if (sPreviousHash !== undefined) {
      window.history.go(-1);
    } else {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("RouteView1", {}, true);
    }
  },
         onRouteMatched: function(oEvent){
             var sid = oEvent.getParameter("arguments").EmployeeID;
             
             var sPath = this.getView().getModel().createKey("Employees", {
                 EmployeeID: sid
             });
             console.log(sPath);
             this.getView().bindElement("/"+sPath);

         },
         showContact: function()
         {
             if(!this._myDialog){
                this._myDialog = sap.ui.xmlfragment("employeelr.fragments.contact",
                                this);

                               this.getView().addDependent(this._myDialog);}
                               
                this._myDialog.open();
    },
     onClose : function() {
                this._myDialog.close();
    }
             

         


	});

});

