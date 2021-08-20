sap.ui.define([
 "sap/ui/core/mvc/Controller",
 'sap/m/MessageBox',
 'sap/ui/model/Sorter',
 "sap/m/PDFViewer",	
 'sap/ui/model/Filter',
 "sap/ui/model/FilterOperator",
 
        'sap/ui/core/Fragment',
    
        'sap/ui/export/Spreadsheet',
        'sap/ui/core/util/ExportTypeCSV',
        'sap/ui/core/util/Export',
        'sap/ui/export/library',
            "sap/ui/core/UIComponent"
           
        
        


], function (Controller , MessageBox  , UIComponent, Export ,exportLibrary , ExportTypeCSV , Sorter , Filter , Fragment  , FilterOperator , PDFViewer , Spreadsheet) {
 "use strict";

  // var EdmType = exportLibrary.EdmType;

 return Controller.extend("employeelr.controller.View1", {
  onInit: function () {
      	 

             },
           
             
		

		
      onSearch: function(oEvent){
                         
                    var val1 = this.getView().byId("Table1");
                     var oBind = val1.getBinding("items");
                     var svalue = oEvent.getParameter("query");
                     if(svalue === "" || svalue === null || svalue === undefined){
                             oBind.filter([]);
                             return;
                     }
                     var name = new sap.ui.model.Filter("FirstName", sap.ui.model.FilterOperator.Contains, svalue);
                      var dat = new sap.ui.model.Filter("Address", sap.ui.model.FilterOperator.Contains, svalue);
                      var oFilter = new sap.ui.model.Filter([name, dat],false);
                    

                     oBind.filter(oFilter);





         /*var aFilter = [], sQuery = oEvent.getParameter("query"),
           oTable = this.getView().byId("Table1"),
           oBinding = oTable.getBinding("items");

           if(sQuery) {  

                    aFilter.push(new sap.ui.model.Filter("FirstName", sap.ui.model.FilterOperator.Contains, sQuery));
           }
        
           oBinding.filter(aFilter);*/
         },

  	handleLinkPress: function () {
			sap.m.MessageBox.alert("emp id selected");
        },
        handleSortButtonPressed: function() {

              this._Dialog = sap.ui.xmlfragment("employeelr.fragments.SortDialog",
                                this);
                                this.getView().addDependent(this._Dialog);
                this._Dialog.open();
    

        },
        handleFilterButtonPressed: function() {
                     this._Dialog1 = sap.ui.xmlfragment("employeelr.fragments.FilterDialog",
                                this);
                this._Dialog1.open();
        } , 

        createColumnConfig: function() {
			var aCols = [];

			

			aCols.push({
				label: 'ID',
				//type: EdmType.Int32,
				property: 'EmployeeID',
				scale: 0
			});

			aCols.push({
				property: 'FirstName',
				//type: EdmType.String
			});

			aCols.push({
                property: 'Title',
               width: 25
				//type: EdmType.String
			});

			aCols.push({
                property: 'HireDate',
                type: sap.ui.export.EdmType.Date,
                format: "yyyy mmmm dd",
                width: 25
                


               // type: EdmType.Date,
                	 		
               
               
               		/*inputFormat: '^([0-9]{4})([0-9]{2})',
				template: '{1}/{0}',
				width: 25,
				textAlign: 'end'*/
			});

			aCols.push({
                property: 'HomePhone',
                width: 25,
				//type: EdmType.Number,
				
				delimiter: true
			});

			aCols.push({
				property: 'Country',
				//type: EdmType.String
			});

			aCols.push({
				property: 'Address',
				//type: EdmType.String
				width: 25
			});

			return aCols;
		},

		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('Table1');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export sample.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new sap.ui.export.Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},

		onExit: function() {
			this._oMockServer.stop();
		},
        
      /*  onExport: function(oEvent){
                          var oExport = new sap.ui.core.util.Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new sap.ui.core.util.ExportTypeCSV({
					separatorChar : ";"
				}),

				// Pass in the model created above
				models : this.getView().getModel(),

				// binding information for the rows aggregation
				rows : {
					path : "/Employees"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : "EmpID",
					template : {
						content : "{EmployeeID}___ "
					}
				}, {
					name : "EmpName",
					template : {
						content : "{FirstName}"
					}
                },*/
                /* {
					name : "HireDate",
					template : {
						content : "{HireDate}"
					}
                }*/
              /* {
					name : "Country",
					template : {
						content : "{Country}"
							
						}
					// "{Width} x {Depth} x {Height} {DimUnit}"
					
				}, {
					name : "Phone",
					template : {
						content : "__{HomePhone}__"
					}
				}, {
					name : "Address",
					template : {
						content : "_{Address}_"
					}
                },
                {
					name : "Title",
					template : {
						content : "{Title}"
                    }
                },
                 {
					name : "HireDate",
					template : {
                        content : "{HireDate}"
                    }
 
                }

            ]
			});
 
			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});*/
		


                       /*  var opdfViewer = new sap.m.PDFViewer();
			this.getView().addDependent(opdfViewer);
			var sServiceURL = this.getView().getModel().sServiceUrl; 
			var sSource = "sap/ui/demo/mock/products.json";
			opdfViewer.setSource(sSource);
			opdfViewer.setTitle( "My PDF");
			opdfViewer.open();*/	
	          
    //},
        	
	handleSortDialogConfirm: function (oEvent) {

       			var oTable = this.byId("Table1"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

            sPath = mParams.sortItem.getKey();
           
			bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);
        },

        	handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("Table1"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function(oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new sap.ui.model.Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

				
					
			

			// apply filter settings
			oBinding.filter(aFilters);

			// update filter bar
			//this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			//this.byId("vsdFilterLabel").setText(mParams.filterString);
        },
        
        onPressItem: function(oEvent){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
                  oRouter.navTo("Detail", {
                      EmployeeID: oItem.getBindingContext().getObject().EmployeeID
                  });
        }

       /* onSelectChange: function(){
            
  }*/
            
         	
		
        	
		

		
		
		
		



        

  /*
  onClick: function (oEvent) {
   var b = this.getView().byId("Table1").getModel();
   var a = oEvent.getSource().getBindingContext();
   var c = b.getProperty(a + "/FirstName");
   var d = b.getProperty(a + "/Country");
   sap.m.MessageToast.show("Hello" + " " + c + " " + "Your current office location is" + " " + d);
  }*/
 });
});