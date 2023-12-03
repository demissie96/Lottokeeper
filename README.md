## Specifikációk:

### Általános

- 5 számot kell megtippelni, 1-39-ig.
- Nyeremény a 2-es, 3-as, 4-es és 5-ös találatokért jár.
- Egy játék ára 500 akcse.
- Játékosként és Üzemeltetőként is lehessen használni.

### Játékos

- Adhat magának egy nevet.
- Az induló egyenlege 10 ezer akcse.
- A nevét és az egyenlegét ne veszítse el, ha napok múlva újra visszatér játszani.
- Bármennyi szelvényt megtehet, amíg van rá kerete.
- Meg tudja nézni a leadott szelvényeit a tippelés sorrendjében; ezt a listát ne lehessen rendezni.
- Húzás után meg tudja nézni, hogy mely szelvénye hány találatos lett, és mennyi a rá kifizetett összeg.
- A listát lehessen rendezni a találatok száma alapján.
- A lista tartalmazzon egy összesítő sort, amiben az összes nyereménye látható.

### Üzemeltető

- Az induló egyenlege 0 akcse.
- Az egyenlegét ne veszítse el, ha napok múlva újra visszatér üzemeltetni.
- Tud szimulálni további játékosokat oly módon, hogy
  - Megad egy számot (X), hogy hány szelvényt generáljon a játék.
  - Generáláskor X darab szelvény készüljön, mindegyik másik 5 random számmal.
  - Ezeknek a szelvényeknek az ára adódjon hozzá az üzemeltető egyenlegéhez.
- Egy listában megnézheti az összes leadott szelvényt.
  - A lista elején a játékos szelvényei szerepeljenek.
  - Generált szelvény-e, vagy a Játékos tette meg.
  - A listát ne lehessen rendezni.
- Elindíthatja a húzást, melynek során:
  - A játék generáljon le 5 random számot.
  - A Játékos nyereménye adódjon hozzá az egyenlegéhez.
  - A kifizetendő nyeremények összege vonódjon le az Üzemeltető egyenlegéből.
- Jelenjen meg egy kimutatást az eredményekkel:
  - 5-ös, 4-es, 3-as, 2-es találattal rendelkező szelvények, valamint a
    nyeretlen szelvények száma.
  - Az egyes találatokra szelvényenként kifizetendő nyeremény.
  - Az egyes találatokra összesen kifizetendő nyeremény.
  - Az összes szelvény száma.
  - Az összes szelvény után járó bevétel.
  - Az összes találatra összesen kifizetendő összeg.
  - Az üzemeltető nyeresége.

### Egyebek

- Azt, hogy mi alapján kalkulálódik a nyertes szelvényekre járó kifizetés, Ön dönti
  el - az egyetlen fontos cél, hogy az üzemeltető nyereséges legyen minden egyes
  húzás után.
- Semmilyen autentikáció nem szükséges, az oldalon gond nélkül lehessen
  játékosként és üzemeltetőként is tevékenykedni.
