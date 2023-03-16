module.exports = mongoose => {
    var Person = mongoose.model('person');
    var Food = mongoose.model('food');
    var Schema = mongoose.Schema; 

    var schema = mongoose.Schema(
      {
        person: { type: Schema.ObjectId, ref: "Person" },
        food: {type: Schema.ObjectId, ref: "Food"},
        amount : Number,
        state: Boolean
      },
      { timestamps: true }
    );
    
    

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const PersonFood = mongoose.model("personFood", schema);
    return PersonFood;
  };