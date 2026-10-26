# AUGMANITAI public lexicon — browser demo

A read-only lookup of 56 published author-defined terms, with original definitions, attribution, source DOI and licence. This demonstrates retrieval of published terminology; it is not diagnosis, scientific consensus validation or a recommendation for consequential decisions.

## Use
Live demo: https://andreasehstandlicenseofclarityloc.github.io/augmanitai-public-lexicon-webmcp/

Keep all files together and open START.html. Enter Nachstille and choose English to retrieve After-Silence. Search is exact after Unicode/case/whitespace normalization; unknown terms return no match. Missing language versions are explicitly marked, never generated.

The form works without WebMCP. In a compatible browser, the page registers lookup_published_augmanitai_term through document.modelContext. Its input is {"query":"Nachstille","language":"en"}; language may also be de. The button “WebMCP wirklich aufrufen” discovers and executes the registered tool, then compares the response to the local lookup. UNAVAILABLE means the necessary native API is absent; FAILED means the check did not succeed. No browser settings are changed.

## Evidence and limits
On 25 October 2026 at 15:11:00.642 UTC, the operator supplied a native result PASS_NATIVE_DISCOVERY_AND_EXECUTION for after-silence, DOI 10.5281/zenodo.22179215, secureContext:true. This covers that local browser invocation of the original adapter. It does not demonstrate external agent integration, other browsers, independent adoption or W3C certification. JavaScript execution logic is unchanged; the tool description has a spacing correction. HTML adds descriptive JSON-LD and a clarified processing notice. The earlier native result was not repeated for this packaging change.

Lookup and the native check do not send network requests or invoke a language model. Clicking a source or licence link opens the corresponding external site. Hosting this demo may produce logs according to the chosen host's configuration; this package does not configure a host.

## Reuse
See LICENSES.md for the distinction between demo code and source records. Preserve each record's attribution, DOI, source and licence when reusing it. The published wording is retained; data is wrapped as JavaScript for this browser demo.

## Task worksheet

[Use the printable German worksheet](https://andreasehstandlicenseofclarityloc.github.io/augmanitai-public-lexicon-webmcp/trainer.html). Preserve your baseline, check one suggested change, then record the actual result and possible confounders. This static page has no input collection or scripts. The constructed example and self-report do not establish learning or effectiveness. The optional Zweitauge quotation retains its source and CC BY 4.0 attribution.
