const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
 
// Definindo o caminho para a pasta temporária, onde os arquivos serão armazenados inicialmente
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
// Define o caminho para a pasta de uploads onde os arquivos serão armazenados permanetemente
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

// define a configuração do multer
const MULTER = {
  // especifica  o armazenamento em disco
  storage: multer.diskStorage({
    // define o  destino dos arquivos carregados como a pasta temporária
    destination: TMP_FOLDER,
    // função que define o nome do arquivo no servidor, gerando um hash aleatório
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      // anexa o hash aleatório ao nome orininal do arquivo, garantindo que cada arquivo tenha um nome único evitando sobreposições
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename);
    } 
  })
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}