import express from 'express';
import cors from 'cors'; 
import rotaRecebiveis from '../justaServer/rotas/recebiveis.js';
import rotaVendas from '../justaServer/rotas/vendas.js';
import rotaUsers from '../justaServer/rotas/users.js';


const app = express();
app.use(express.json());


const port = 8000;

// Dando a permissão
app.use(cors({
    origin: '*' 
}));

app.use('/vendas', rotaVendas);
app.use('/recebiveis', rotaRecebiveis);
app.use('/users', rotaUsers);

app.listen(port, () => {
    console.log("Escutando a porta 8000");
});
