# <center>Entwurf Medientechnik Projekt <center>

# <center> Quirin  Ecker - 2019/20 <center>

## Projektname

doit

## Projekt aus Sicht des Users

![entwurf](/Users/quirin/Documents/3AHITM/Webtechnologien/Projekt/project/php-projekt/Entwürfe/prototype-01/Screen Shot 2019-09-26 at 13.37.55.png)

Wenn man ganz einfach in einer Liste ist schaut die Oberfläche wie am ganz linken bild aus. Um eine neue Liste zu erstellen, drückt man auf das Burgermenü. Dann öffnet sich ein Menü, dass so auschaut wie das 3. Bild von links. Hier kann man alle seine Listen auswählen und wie schon erwähnt listen erstellen mit dem Plus Button kommt man dann auf das 4. Bild. Dort gibt man dann den namen der Liste ein und drückt auf create. In der weißen Leiste oben kommst man zu den Nutzereinstellungen und kann sich ausloggen.

Auf den Oberen Screenshot ist dann das Anmeldeformular.

Für die weiße Navigation über den Lists gilt folgende funktionen von links aus.

- Info
- Edit lists
- Einstellungen
- Log out

Der zweite screenshot von links zeigt zum einen wie man tasks mit kategorien suchen kann und auch neue erstellen kann. Ein grauer task bedeuted, dass er noch nie auf der task Liste war, Rot bedeuted er muss erledigt werden und grün ist der verlauf von erledigten tasks.

Zusammengefasst:

- **Grün:** erledigt
- **Rot:** zu erledigen
- **Grau:** war noch nie auf der taskliste

Somit muss man nur den task den man erledigen muss in der Suchleiste eingeben und er wird bei den Suchergebnisen als grau angeschrieben tippt man auf den task wirtd er rot und kommt ganz nach oben zu den anderen die erledigt werden müssen. Das gleiche gilt mit den Grünen und mit den Roten außer, dass die Roten grün werden und nach unten zu den anderen grünen kommen.

## Projekt aus sicht des Developers

![developerview](/Users/quirin/Documents/3AHITM/Webtechnologien/Projekt/project/php-projekt/Entwürfe/prototype-01/Screen Shot 2019-09-26 at 13.09.35.png)

Jeder Nutze ist in der Nutzerlist und jeder Nutzer hat eine taskliste in der sich alle Tasks des Nutzers befinden. Die die er noch erledigen muss und die er schon erledigt hat dies wird mit der Property State angegeben.

Vieles wird im frontend erledigt mit der Fetch api oder XMLHTTP Request wird über eine Klasse die ich erstellen auf das Backend zugegriffen. Diese Klasse wird die methoden haben wie ich auf das Backend zugreiffe zugreiffen werde.
