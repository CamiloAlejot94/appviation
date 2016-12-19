import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login-page/login-page';
import { SignUpPage } from '../pages/sign-up/sign-up'
import { InitialTest } from '../pages/initial-test/initial-test'
import { AboutInitialTest } from '../pages/initial-test/about-initial-test/about-initial-test'
import { TipTest } from '../pages/initial-test/about-initial-test/about-initial-test'
import { InitialTestContent } from '../pages/initial-test/initial-test-content/initial-test-content'
import { InitialListening } from '../pages/initial-test/initial-listening/initial-listening'
import { CueCard } from '../pages/initial-test/initial-listening/initial-listening'
import { InitialPlayer } from '../pages/initial-test/initial-listening/initial-listening'
import { Lets } from '../pages/lets/lets'
import { IcaoStandars } from '../pages/icao-standars/icao-standars'
import { Exercises } from '../pages/exercises/exercises'
import { PronunciationExercise } from '../pages/pronunciation-exercise/pronunciation-exercise'
import { PronunciationExerciseListen } from '../pages/pronunciation-exercise-listen/pronunciation-exercise-listen'
import { PronunciationPractice } from '../pages/pronunciation-practice/pronunciation-practice'
import { ModalExerciseListen } from '../pages/pronunciation-exercise-listen/pronunciation-exercise-listen'
import { ComprehensionExercise } from '../pages/comprehension-exercise/comprehension-exercise'
import { ComprehensionPractice } from '../pages/comprehension-practice/comprehension-practice'
import { FluencyExercise } from '../pages/fluency-exercise/fluency-exercise'
import { FluencyPractice } from '../pages/fluency-practice/fluency-practice'
import { ShowPracticesPage } from '../pages/show-practices/show-practices'
import { InteractionExercise } from '../pages/interaction-exercise/interaction-exercise'


@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    LoginPage,
    SignUpPage,
    InitialTest,
    AboutInitialTest,
    TipTest,
    InitialTestContent,
    InitialListening,
    CueCard,
    InitialPlayer,
    Lets,
    IcaoStandars,
    Exercises,
    PronunciationExercise,
    PronunciationPractice,
    PronunciationExerciseListen,
    ModalExerciseListen,
    ComprehensionExercise,
    ComprehensionPractice,
    FluencyExercise,
    FluencyPractice,
    ShowPracticesPage,
    InteractionExercise
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,    
    LoginPage,
    SignUpPage,
    InitialTest,
    AboutInitialTest,
    TipTest,
    InitialTestContent,
    InitialListening,
    CueCard,
    InitialPlayer,
    Lets,
    IcaoStandars,
    Exercises,
    PronunciationExercise,
    PronunciationPractice,    
    PronunciationExerciseListen,
    ModalExerciseListen,
    ComprehensionExercise,
    ComprehensionPractice  ,
    FluencyExercise,
    FluencyPractice,
    ShowPracticesPage,
    InteractionExercise
  ],
  providers: []
})
export class AppModule {}
