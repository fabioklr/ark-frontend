<template>
    <div class="flex flex-col items-center mt-16">
        <!-- Round image -->
        <div class="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden drop-shadow-lg mb-12">
            <img 
                :src="portrait"
                alt="Portrait"
                width="360"
                height="360"
                class="w-full h-full object-cover rounded">
        </div>
        <!-- Text about Rolf Keller who is an architect and lives in Zurich. 
            He's had his own company for 30 years, loves what he does and likes watches and nice things. -->
        <div class="text-center md:px-16">
            <h2 class="text-3xl font-bold mb-8">
                wenn mr öppis macht, denn richtig oder gar nöd.
            </h2>
            <p class="text-lg mb-16 md:px-56">
                es begann mit der frage und der faszination, was papierflugzeuge zum fliegen, sandbrücken zum tragen und modelleisenbahnen zum laufen bringt. daraus wurde eine lebenslange beschäftigung mit konstruktion, architektur und design, bis heute mit fokus auf das wesentliche und geleitet von den prinzipien qualität, fleiss, bescheidenheit und fairness.
                <br><br>
                als architekt mit erfahrung in der bauleitung, verbinde ich planung mit ausführung und weiss, was projekte voranbringt und zum erfolg führt. ich verbinde pragmatismus mit einem klaren sinn für gestaltung. unverputzte wände, moderne akzente, verspielte details, sorgfältig aufeinander abgestimmt. wer mein büro betritt, erkennt die handschrift sofort.
                <br><br>
                ob umbau oder neubau: ich schätze die herausforderung und vielfalt in meiner arbeit und greife auf diese neugier sowie erfahrung zurück, um passgenaue lösungen zu entwickeln. mein portfolio reicht von wohnbauten über gewerbeprojekte – mit einer spezialisierung auf fitnesscenter.
                <br><br>
                schliesslich muss architektur für die menschen funktionieren, die sie nutzen. sie soll räume schaffen, die klarheit ausstrahlen, nützlich sind und zugleich inspirieren. mein ziel ist es orte zu gestalten, die beständigkeit und qualität haben, aber dennoch offen sind für die bewegung und die zukunft.
            </p>
        </div>
    </div>
</template>

<script>
import portrait from '@/assets/portrait.webp'

export default {
  data() {
    return {
      portrait
    }
  }
}
</script>