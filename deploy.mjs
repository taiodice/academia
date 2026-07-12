import { NodeSSH } from 'node-ssh';
import path from 'path';

const ssh = new NodeSSH();

async function deploy() {
  console.log('Conectando al VPS de Hostinger...');
  await ssh.connect({
    host: '76.13.25.49',
    username: 'root',
    password: 'Hyperion.123'
  });
  console.log('¡Conectado exitosamente!');

  console.log('Subiendo archivos (esto puede tardar unos minutos)...');
  await ssh.putDirectory('./', '/root/academia', {
    recursive: true,
    concurrency: 10,
    validate: function(itemPath) {
      const baseName = path.basename(itemPath);
      return !['node_modules', '.next', '.git', 'dev.db'].includes(baseName);
    }
  });
  console.log('Archivos subidos.');

  console.log('Instalando dependencias en el servidor...');
  let res = await ssh.execCommand('npm install', { cwd: '/root/academia' });
  console.log(res.stdout);

  console.log('Generando motor de base de datos MySQL...');
  res = await ssh.execCommand('npx prisma generate', { cwd: '/root/academia' });
  console.log(res.stdout);

  console.log('Migrando tablas a MySQL...');
  res = await ssh.execCommand('npx prisma db push', { cwd: '/root/academia' });
  console.log(res.stdout);

  console.log('Compilando la Academia (Next.js Build)...');
  res = await ssh.execCommand('npm run build', { cwd: '/root/academia' });
  console.log(res.stdout);
  console.log(res.stderr);

  console.log('Instalando PM2 para mantenerla online...');
  await ssh.execCommand('npm install -g pm2', { cwd: '/root' });

  console.log('Iniciando el servidor de la Academia...');
  res = await ssh.execCommand('pm2 restart academia || pm2 start npm --name "academia" -- start', { cwd: '/root/academia' });
  console.log(res.stdout);

  console.log('¡Despliegue Completo! La Academia está corriendo en Hostinger (puerto 3000).');
  ssh.dispose();
}

deploy().catch(err => {
  console.error('Error durante el despliegue:', err);
  ssh.dispose();
});
