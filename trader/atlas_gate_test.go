package trader

import (
	"strings"
	"testing"
)

func TestAtlasPaperOnlyBlocksAutomaticExecution(t *testing.T) {
	t.Setenv("ATLAS_PAPER_ONLY", "true")
	bot := &AutoTrader{}
	err := bot.Run()
	if err == nil || !strings.Contains(err.Error(), "live execution is disabled") {
		t.Fatalf("expected live execution to be rejected, got %v", err)
	}
	if bot.isRunning {
		t.Fatal("paper-only deployment started a live trader")
	}
}
