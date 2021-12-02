//declare Variables
const nodemailer=require("nodemailer")
 let fromMail="bjrprogamer@gmail.com"
 let toMail="freelancerbjr@gmail.com"
 let sub="BJR Weather Forecast"
 let text="Hey Bro, Whatsapp. I am jamil Full Stack Web Developer. I found some issue in this site please fix it as soon as possiblle..Thank you...Take care"

 const transporter=nodemailer.createTransport({
     service:"gmail",
     auth:{
         user:"bjrprogamer@gmail.com",
         pass:"Jamilurrahmana1@"
     }
 });
 //MailOption
//   let mailoption={
//       from:fromMail,
//       to:req.body.email,
//       subject:sub,
//       text:req.body.message
//   };
//sendEmail
// const sendEmail=transporter.sendMail(mailoption , (err, res)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// });
module.exports={  transporter };