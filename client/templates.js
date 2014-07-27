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
        //Affiches.remove(id);
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
    }
};