function resetmessages() {
    $(".Nousername, .Wrongusername, .Incompleteusername, .Everythingright, .Fetched").fadeOut();
}
$(function () { 
    var FetchedDetails = null;
    $(".Fetched, .Wrongusername, .Incompleteusername, .Everythingright").hide();
    $("#github-username").keyup(function () {
        if ($(this).val().trim().length > 0) {
            $("#check").prop("disabled", false);
            if(!$(".Nousername").is("visible")) {
                resetmessages();
                $(".Nousername").fadeIn();
            }
        }
        else {
            $("#check").prop("disabled", true);
        }
    });

    $("#check").click(function (e) {
        e.preventDefault();     
        $("#github-username", "#check").prop("disabled", true);
        //alert("Check button is clicked");
        $.getJSON("https://api.github.com/users/" + $("#github-username").val(), function(res) {
            FetchedDetails = res;
            if(res.login && res.avatar_url && res.name && res.company && res.blog && res.location && res.bio && res.twitter_username) {
                resetmessages();
                $(".Everythingright").fadeIn();
                $("#fetch").prop("disabled", false);
            }
            else {
                resetmessages();
                $(".Incompleteusername").fadeIn();
            }
        }
        ).fail(function () {
            //console.log("error");
            resetmessages();
            $(".Wrongusername").fadeIn();
        });
    });

    $("#fetch").click(function (e) {
        e.preventDefault();
        //alert("Fetch button is clicked"); 
        $(".Fetched #avatar_url").attr("src", FetchedDetails.avatar_url);
        $(".Fetched #login").text(FetchedDetails.login);   
        $(".Fetched #name").text(FetchedDetails.name); 
        $(".Fetched #company").text(FetchedDetails.company); 
        $(".Fetched #blog").text(FetchedDetails.blog); 
        $(".Fetched #location").text(FetchedDetails.location); 
        $(".Fetched #hireable").text(FetchedDetails.hireable); 
        $(".Fetched #twitter").text(FetchedDetails.twitter); 
        $(".Fetched #bio").text(FetchedDetails.bio); 
        resetmessages();
        $(".Fetched").fadeIn(); 
    });
});