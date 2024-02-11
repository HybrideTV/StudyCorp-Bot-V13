const gameDb = require('./src/utils/database/models/game');
const serverDb = require('./src/utils/database/models/server');
const bankDb = require('./src/utils/database/models/bank');
const ticketDb = require('./src/utils/database/models/tickets');

module.exports =
   {
     getTerre,
     getPierre,
     getBois,
     getCharbon,
     getFer,
     getOr,
     getDiamant,
     getEmeraude,
     getUranium,
     getMoney,


     getRaidStatus,

     getBank,

     getClient,
     getClientId,

     getVendeurId

     
   }


   async function getClient(id){
    var res = await ticketDb.findOne({idticket: id});
      return res.get('pseudo');
  }

  async function getClientId(id){
    var res = await ticketDb.findOne({idticket: id});
      return res.get('userId');
  }

  async function getVendeurId(id){
    var res = await ticketDb.findOne({idticket: id});
      return res.get('pris');
  }

   async function getTerre(id){
          var res = await gameDb.findOne({userId: id});

          return res.get('terre');     
    }

    async function getBank(id){
      var res = await bankDb.findOne({userId: id});
      if(res === null){
        let createUser = new bankDb({
          userId: id,
          money: 0
      });
      createUser.save().catch(err => console.log(err));
      }
        return res.get('money');     
}

    async function getPierre(id){
          var res = await gameDb.findOne({userId: id});
          return res.get('pierre');
    }

    async function getRaidStatus(id){
      var res = await serverDb.findOne({guildId: id});
      return res.get('raid');
    }

    async function getBois(id){
        var res = await gameDb.findOne({userId: id});
          return res.get('bois');
    }

    async function getCharbon(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('charbon');
    }

    async function getFer(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('fer');
    }

    async function getOr(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('or');
    }

    async function getDiamant(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('diamant');
    }

    async function getEmeraude(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('emeraude');
    }

    async function getUranium(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('uranium');
    }

    async function getMoney(id){
      var res = await gameDb.findOne({userId: id});
        return res.get('money');
    }
    

