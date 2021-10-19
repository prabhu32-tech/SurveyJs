Survey
    .StylesManager
    .applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

function surveyValidateQuestion(survey, options) {
    
    var empId = options.data["empId"];
    
    if (!empId) {
        options.complete();
        return;
    }
    $
        .ajax({
            url: "/api/surveyresult/result" + empId
        })
        .then(function (data) {
            var found = data.length > 0;
            
            if (!found)
                options.errors["empId"] = " '" + empId + "' is not in this list: /api/surveyresult/result";

           
            options.complete();
        });
}
//survey.onComplete.add(function (sender, options) {
//    var xhr = new XMLHttpRequest();
//    xhr.open("POST", "/api/surveyresult/result");
//    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//    xhr.send(JSON.stringify(sender.data));
//});

onComplete = (model) => {
    model.onComplete.add(function (sender, options) {
       
        options.showDataSaving('Thank You');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/surveyresult/result");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onload = xhr.onerror = function () {
            if (xhr.status === 200) {
                options.showDataSavingSuccess("success!"); 
                // options.showDataSavingClear();
            } else {
                
                options.showDataSavingError("Error when saving the survey on database"); // you may pass a text parameter to show your own text
            }
        };
        xhr.send(JSON.stringify(sender.data));
    });
}

var json = {

    pages: [
        {
            questions: [
                {
                    "type": "text",
                    "name": "name",
                    "title": " Name ",
                    "isRequired": true
                
                },
                 {
                    "type": "text",
                    "name": "empId",
                    "startWithNewLine": false,
                    "title": "Employee Id",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "inputType": "email",
                    "name": "Email_Id",
                    "title": "Email",
                    "isRequired": true

                },
                {
                    "type": "text",
                    "inputType": "date",
                    "isRequired": true,
                    "name": "birthDate",
                    "startWithNewLine": false,
                    "title": "Date of birth:"
                },
                {
                    "type": "checkbox",
                    "choices": ["HR", "Staffing", "Product Development", "IT"],
                    
                    "name": "department",
                    "title": "Department",
                    "isRequired": true

                },
                {
                    "type": "dropdown",
                    "name": "empType",
                    "choices": ["Full Time", "Contract Base"],
                    "startWithNewLine": false,
                    "title": "Employee Type",
                    "isRequired": true
                }
            ]
        },
        //{
        //    questions: [
        //        {
        //            "type": "text",
        //            "inputType": "email",
        //            "name": "Email_Id",
        //            "title": "Email",
        //            "isRequired": true

        //        },
        //        {
        //            "type": "text",
        //            "inputType": "date",
        //            "isRequired": true,
        //            "name": "birthDate",
        //            "startWithNewLine": false,
        //            "title": "Date of birth:"
        //        }
        //    ]
        //},
        {
            questions: [
                //{
                //    type: "matrix",
                //    name: "Quality",
                //    title: "Please indicate if you agree or disagree with the following statements",
                //    columns: [
                //        {
                //            value: 1,
                //            text: "Strongly Disagree"
                //        }, {
                //            value: 2,
                //            text: "Disagree"
                //        }, {
                //            value: 3,
                //            text: "Neutral"
                //        }, {
                //            value: 4,
                //            text: "Agree"
                //        }, {
                //            value: 5,
                //            text: "Strongly Agree"
                //        }
                //    ],
                //    rows: [
                //        {
                //            value: "affordable",
                //            text: "Product is affordable"
                //        }, {
                //            value: "does what it claims",
                //            text: "Product does what it claims"
                //        }, {
                //            value: "better then others",
                //            text: "Product is better than other products on the market"
                //        }, {
                //            value: "easy to use",
                //            text: "Product is easy to use"
                //        }
                //    ]
                //}, 
        {
                    type: "rating",
                    name: "satisfaction",
                    title: "How satisfied are you with the Product?",
                    isRequired: true,
                    mininumRateDescription: "Not Satisfied",
                    maximumRateDescription: "Completely satisfied"
                }, {
                    type: "rating",
                    name: "recommend friends",
                    visibleIf: "{satisfaction} > 3",
                    title: "How likely are you to recommend the Product to a friend or co-worker?",
                    mininumRateDescription: "Will not recommend",
                    maximumRateDescription: "I will recommend"
                }, {
                    type: "comment",
                    name: "suggestions",
                    title: "What would make you more satisfied with the Product?"
                }
            ]
        }, {
            questions: [
                {
                    type: "radiogroup",
                    name: "price to competitors",
                    title: "Compared to our competitors, do you feel the Product is",
                    choices: ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
                }, {
                    type: "radiogroup",
                    name: "price",
                    title: "Do you feel our current price is merited by our product?",
                    choices: ["correct|Yes, the price is about right", "low|No, the price is too low for your product", "high|No, the price is too high for your product"]
                }, {
                    type: "multipletext",
                    name: "pricelimit",
                    title: "What is the suitable Price(Rs.) ",
                    items: [
                        {
                            name: "mostamount",
                            title: "Most suitable  amount you would every pay for a product like ours"
                        }
                    ]
                }
            ]
        }
        , {
            questions: [
                {
                    //type: "text",
                    //name: "email",
                    title: "Thank you for taking our survey. Your survey is  complete,  press the 'Complete' button."
                }
            ]
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (sender) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });

$("#surveyElement").Survey({ model: survey });;
