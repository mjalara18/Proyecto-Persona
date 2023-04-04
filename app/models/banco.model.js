module.exports = mongoose => {
  var Schema = mongoose.Schema;
  var Person = mongoose.model('person');

  var schema = mongoose.Schema(
    {
      name1 : String,
      adress: String,
      cell: Number,
      fondos: Number,
      estrato: Number,
      gerente: { type: Schema.ObjectId, ref: "Person" }
    },
    { timestamps: true }
  );
  
  

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Banco = mongoose.model("banco", schema);
  return Banco;
};

