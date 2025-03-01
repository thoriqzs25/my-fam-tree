## Untuk Start
1. Pastiin ada data.json di root dir sebelum build
2. Run script `sh build.sh`, dia build docker image + push ke hub docker
3. Di VM run `sh run.sh`, ini stop running container, prune, run, pull image kl ga nemu local
4. Aset foto simpen di public/photos terus di avatar set kaya gini `/photos/abc.jpg`

```Jangan lupa hapus docker images di VM biar ga keberatan VM nya```