

let isDark = false;




function switchModes(){
    


    if(isDark === true){
        
        console.log("I'm true");
        document.documentElement.style.setProperty("--col-01", "#1A1919")
        document.documentElement.style.setProperty("--col-02", "#807d79")

        document.documentElement.style.setProperty("--col-05", "#d6a25c")
        document.documentElement.style.setProperty("--col-06", "#f2efe4")
        document.getElementById("modeButton").innerHTML="Dark Mode";
        isDark = false;
        
    }


    else{
        console.log("I'm false");
        document.documentElement.style.setProperty("--col-01", "#D3D0CB")
        document.documentElement.style.setProperty("--col-02", "#807d79")

        document.documentElement.style.setProperty("--col-05", "#d6a25c")
        document.documentElement.style.setProperty("--col-06", "#f2efe4")
        document.getElementById("modeButton").innerHTML="Light Mode";
        isDark = true;
        
    }

}