$(function(){
    var searchJobValue = document.getElementById("description_field"),
        lookForJobs = document.getElementById("findSomeJobs"),
        jobsList = document.getElementById("job-results"),
        clearButton = document.getElementById("clear-button"),
        jobSearchUri = "https://jobs.github.com/positions.json?description={{title}}&callback=?",
        
        jobInfo = document.getElementById("job-info"),
        nJobSearchUri;
        
    var createJobList = function(jobData){
        jobsList.innerHTML = "";
        if(jobData == ""){
            console.log("Sorry: No data passed to createJobList method.");
            alert("I'm sorry, I didn't find any jobs for " + searchJobValue.value + ".");
            return false;
        }

        jobData.forEach(function(job){
            var jobItem = document.createElement("li"),
                addJobLink = document.createElement("a");
                               

                jobItem.classList.add("list-group-item");
                
                addJobLink.innerText = job.title;
                addJobLink.href = "#";
                //addJobLink.href =job.url;
               // addJobLink.href ="jobresults/"+ job.id;
                addJobLink.addEventListener("click", function(){ 
                    jobInfo.innerHTML = "";     
                    var jobLink = document.createElement("a"),
                        jobDiv = document.createElement("div");
                        jobDiv.innerHTML = job.description;
                        jobLink.innerText = "Company Website";
                        jobLink.classList.add("btn");
                        jobLink.classList.add("btn-primary");

                    
                        jobLink.href = job.company_url;
                    jobInfo.appendChild(jobDiv);
                    jobInfo.appendChild(jobLink);
                });
                                            
                jobItem.appendChild(addJobLink);
                jobsList.appendChild(jobItem);
            });
        };    


    lookForJobs.addEventListener("click", function(){
        nJobSearchUri = jobSearchUri.replace("{title}", searchJobValue.value);
        $.getJSON(nJobSearchUri, function(returnData){
            // alert(returnData[0].title);
            createJobList(returnData);
            
        });
    });

    clearButton.addEventListener("click", function(){
        jobsList.innerHTML = "";
        searchJobValue.value = "";
        jobInfo.innerHTML = "";
    });

});