CollectionLivresJeanne = new Meteor.Collection("collectionjeanne");

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

if (Meteor.isClient) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'main',
                'livres-catalogue': 'templateLivres',
                //cette ligne doit être la dernière:
                ':page': 'main',
        },
        main: function (page) {
            page = page ? page : "main";
            this.render(page, {});
        },
        render: function (templateName, context) {
            console.log(templateName, context);
            
            // BACKGROUND COLOR ON PAGES LIVRES
            if (templateName.indexOf("bio-videos") === 0) {
                $('body').addClass('background-black');
            }
            if (templateName.indexOf("videos") === 0) {
                $('body').addClass('background-black');
            }
            
            Session.set('currentPage', templateName);
            var tmpl = Template[templateName];
            if (typeof tmpl === "undefined") {
                this.navigate('/'); //if the template is not found, go to home page
                return;
            }
            var frag = context ? UI.renderWithData(tmpl, context) : UI.render(tmpl);
            UI.insert(frag, document.getElementById("container"));
        },
        templateLivres: function (titre, date) {
            Session.set("titre", titre);
            Session.set("date", date);
            this.render('templateLivres', {});
        }
    });

    Template.templateLivres.livres = function () {
        // ici on va chercher dans la base de données:
        return CollectionLivresJeanne.find();
    };

    var isExternal = function (href) {
        if (href.indexOf("http") === -1 || href.indexOf(document.location.host) !== -1 || href.indexOf("localhost") !== -1 || href.indexOf("127.0.0.1") !== -1) {
            return false;
        }
        return true;
    };

    // initialise le router
    var app = new Router;

    Meteor.startup(function () {

        // démarre le router; rendant possible l’utilisation des boutons Back et Forward dans le browser
        Backbone.history.start({
            pushState: true
        });

        // une fois que toute la structure de la page est là: action
        $(document).ready(function () {

            // action: si c'est externe, on attribue à "ça" une target pour le lien qui est un nouvel onglet
            $("a[href]").each(

            function () {
                if (isExternal($(this).attr('href'))) {
                    $(this).attr('target', '_blank')
                }
            });

            $(function () {
                $(".draggable").draggable();
            });

            var foo = null; // object
            function doMove() {
                foo.style.left = parseInt(foo.style.left) + 1 + 'px';
                setTimeout(doMove, 20); // call doMove in 20msec
            }

            foo = document.getElementById('volant'); // get the "foo" object
            if (foo) { // if the "foo" object is defined
                foo.style.left = '0px'; // set its initial position to 0px
                doMove(); // start animating
            }

            $(".menuhover").mouseenter(function (e) {
                $(this).find(".menuhighlight").show();
                $(this).find(".menubase").hide();
            }).mouseleave(function (e) {
                $(this).find(".menuhighlight").hide();
                $(this).find(".menubase").show();
            });
            
            $("form.login-form button.submit").on("click", function(){
                var user = "jeanne";
                var password = $("input#password").val();
                Meteor.loginWithPassword(user, password);
            });
            
            $("button.logout").on("click", function(){
                console.log("ericooooooo");
                Meteor.logout();
            });
            
            // LIVRES ICONES
            $(".hidden").hide();
            $('.livre-button').click(function() {
                var target = $(this).attr('id').replace('-toggle', '')
                $(".livre-section").removeClass("active");
                $(".livre-section").addClass("hidden");
                $(".hidden").hide();
                $("." + target).removeClass("hidden");
                $("." + target).addClass("active");
                $(".active").show();
            });
            
            // MENU ACCORDEON
            var allPanels = $('.accordion > dd').hide();
    
            $('.accordion > dt > a').click(function() {
                allPanels.slideUp();
                $(this).parent().next().slideDown();
                return false;
            });
                
            // écrire les trucs ici!! on est encore dans document ready
        });

    });

}