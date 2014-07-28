// GET ELEMENTS FROM THE COLLECTIONS IN THE DATABASE

Template.affiches_content.affiches = function () {
    var affiches = Affiches.find({}, { sort: {"published":-1} });
    if (!affiches) { return []; }
    return affiches;
};

Template.autres_dessins.dessins = function () {
    var dessins = Dessins.find({});
    if (!dessins) { return []; }
    return dessins;
};


// MODIFY, DELETE, ADD ELEMENTS THROUGH THE CMS

Template.affiches_content.events = {
    'click div.delete': function(e) {
        var id = e.target.getAttribute("rel");
        var confirmed = confirm("confirmer la suppression de cet élément?");
        if (confirmed){
            console.log("trying to remove", id);
        }
        Affiches.remove(id);
    },
    'click button.show': function(e) {
        var id = e.target.getAttribute("rel");
        console.log("trying to show", id);
        Photos.update(id, {"$set": {"processed": true}});
    },
    'click button.hide': function(e) {
        var id = e.target.getAttribute("rel");
        console.log("trying to hide", id);
        Photos.update(id, {"$set": {"processed": false}});
    },
    'click button[type=submit]' : function(e) {
        e.preventDefault();
        $form = $(e.target).closest("form");
        $input = $form.find("input[type=file]");
        console.log($input);
        $input.each(function(i, el) {
            console.log(el);
            _.each(el.files, function(file) {
                var name = file.name; // FIXME try if we can encodeuricomponent it
                Meteor.saveFile(file, name, "affiches", function() {
                    // Now we are in the callback function: the function that is called when
                    // uploading the file is completed succesfully
                    // FIXME we should only fire the callback if it’s the latest file of the latest file input
                    context = {
                        "img_name" : name,
                        "published": $form.find("input[type=date]")[0].value
                    };
                    // put in the database:
                    Affiches.insert(context);
                });
            });
        });
    }
};