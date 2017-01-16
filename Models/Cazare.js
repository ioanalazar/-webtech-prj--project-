module.exports = function(sequelize, DataTypes) {
    
    var Cazare = sequelize.define('Cazare', {
        id: {
        type: DataTypes.STRING,
        field: 'id'
      }, 
      nume: {
        type: DataTypes.STRING,
        field: 'nume'
      },
      capacitate: {
        type: DataTypes.STRING,
        field: 'capacitate'
      },
      adresa: {
        type: DataTypes.STRING,
        field: 'adresa'
      },
      url: {
        type: DataTypes.STRING,
        field: 'url'
      },
       id_c: {
        type: DataTypes.STRING,
        field: 'id_c'
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
    
    return Cazare;
};