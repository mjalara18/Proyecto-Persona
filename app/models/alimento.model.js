module.exports = mongoose => {
    var Schema = mongoose.Schema; // esto estaba en la documentacion
    var Person = mongoose.model('person');

    var schema = mongoose.Schema(
      {
        foodName : String,
        calories: Number,
        typeFood: String,
        person: { type: Schema.ObjectId, ref: "Person" }
      },
      { timestamps: true }
    );
    
    

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Food = mongoose.model("food", schema);
    return Food;
  };