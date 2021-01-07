## Aplikacja "Team-draw app"

Celem aplikacji jest wylosowanie zespołów z równą liczbą zawodników z wprowadzonej puli graczy. 

## Krótki opis sposobu działania aplikacji 

1. Po załadowaniu aplikacji na ekranie pojawia się `<input>`, w którym należy podać liczbę losowanych zespołów. Po wprowadzeniu wartości i kliknięciu "Dalej", w DOM tworzone są kontenery `<div>` w liczbie odpowiadającej liczbie zespołów. W tych "divach" po zakończeniu losowania wyświetlone zostaną wylosowane zespoły. Na ekranie pojawia się kolejny `<input>`, w którym należy podać liczbę zawodników w każdym zespole.

1. W następnym kroku pojawia się `<input>`, w którym wprowadzane są dane zawodników. Na ekranie wyświetla się lista wprowadzonych zawodników (wprowadzeni zawodnicy dodawani są poprzez `appendChild()` jako kolejne elementy `<li>`). Dane zawodników przechowywane są również dodatkowo w tablicy `playersArray`. Zawodników można usuwać z listy klikając "X" przy zawodniku, a usunięcie z listy powoduje też usunięcie zawodnika z tablicy `playersArray`.

1. Po wprowadzeniu wymaganej liczby graczy (kiedy `playersArray.length` === `liczba zawodników` * `liczba drużyn`), pojawia się `alert()` oraz dostępny staje się przycisk losowania. 

1. Losowanie odbywa się z użyciem pętli umieszczonej w funkcji `drawTeams`. Pętla ta w każdym "cyklu": 

    * losuje jednego zawodnika jako indeks z tablicy `playersArray` przy pomocy `Math.random()` i usuwa tego zawodnika z tablicy za pomocą `splice()`,
    * poprzez `appendChild()` dodaje do jednego z elementów `<div>`, utworzonych w kroku nr 1., element `<p>` zawierający `textContent` z danymi wylosowanego zawodnika.

    Pętla kończy działanie po usunięciu wszystkich zawodników z tablicy `playersArray`.

1. Wylosowane zespoły zostają wyświetlone na ekranie.