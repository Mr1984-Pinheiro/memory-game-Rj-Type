import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImage from './assets/logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button';
import { GridItem } from './components/GridItem';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';



const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount ] = useState<number>(0);
  const [shownCount, setShownCount ] = useState<number>(0);
  const [gridItems, setGridItems ] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    //passo 2 - criar o grid
    // passo 2.1 - criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) tmpGrid.push({
      item: null, shown: false, permanentShown: false
    });

    //passo 2.2 - preencher o grid
    //Executar um for 2 vezes por repetir duas cartas por jogada
    for (let w = 0; w < 2; w++ ){
      //Preencher os 6 seis items em campos aleatorios depois mais seis repetidos
      for (let i = 0; i < items.length; i++) {
        //Preencher uma posição enquanto for nullo
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !==null) {
          //Gerar uma posição aleatoria do tamanho disponivel no caso 12 posições 
          pos = Math.floor(Math.random() * (items.length * 2));
        } 
        //preencher a posição com o item a ser exibido
        tmpGrid[pos].item = i;
      }
    }

    // passo 2.3 - jogar no state
    setGridItems(tmpGrid);

    //passo 3 - começar o jogo
    setPlaying(true);

  }

  const handleItemClick = (index: number) => {

  }

    return (
      <C.Container>
        <C.Info>
            <C.LogoLink href="">
                <img src={logoImage} width="200" alt="" />
            </C.LogoLink>

            <C.InfoArea>
              <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
              <InfoItem label='Movimentos' value='0' />
            </C.InfoArea>

            <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
          <C.Grid>
              {gridItems.map((item, index)=>(
                <GridItem 
                  key={index}
                  item={item}
                  onClick={() => handleItemClick(index)}
                />
              ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    );
}

export default App;