# VietMa

Project React + Vite, da duoc cau hinh de deploy len GitHub Pages bang GitHub Actions.

## Cach deploy len GitHub

1. Tao repository tren GitHub (vi du: `vietma`).
2. Trong thu muc project `VietMa`, chay cac lenh:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

3. Tren GitHub, vao **Settings > Pages**:
- Source: **GitHub Actions**

4. Moi lan push len `main`, workflow se tu build va deploy.

## Local commands

```bash
npm install
npm run dev
npm run build
```

## Link website

Sau khi workflow chay xong, site se co dang:

`https://<username>.github.io/<repo>/`
