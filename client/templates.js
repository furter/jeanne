
Template.affiches_content.affiches = function () {
    var affiches = Affiches.find({});
    if (!affiches) { return []; }
    return affiches;
};

Template.autres_dessins.dessins = function () {
    var dessins = Dessins.find({});
    if (!dessins) { return []; }
    return dessins;
};