const SortingLibrary = {
    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    },

    compare(a, b, ascending) {
        if (a === undefined && b === undefined) return 0;
        if (a === undefined) return ascending ? 1 : -1;
        if (b === undefined) return ascending ? -1 : 1;
        return ascending ? a - b : b - a;
    },

    bubbleSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                comparisons++;
                if (this.compare(arr[j], arr[j + 1], ascending) > 0) {
                    this.swap(arr, j, j + 1);
                    swaps++;
                }
            }
        }
        console.log(`Bubble Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },

    selectionSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            let minMaxIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                if (this.compare(arr[j], arr[minMaxIdx], ascending) < 0) {
                    minMaxIdx = j;
                }
            }
            if (minMaxIdx !== i) {
                this.swap(arr, i, minMaxIdx);
                swaps++;
            }
        }
        console.log(`Selection Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },

    insertionSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && this.compare(arr[j], key, ascending) > 0) {
                comparisons++;
                arr[j + 1] = arr[j];
                swaps++;
                j--;
            }
            arr[j + 1] = key;
        }
        console.log(`Insertion Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },

    shellSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        let gap = Math.floor(arr.length / 2);
        while (gap > 0) {
            for (let i = gap; i < arr.length; i++) {
                let temp = arr[i];
                let j = i;
                while (j >= gap && this.compare(arr[j - gap], temp, ascending) > 0) {
                    comparisons++;
                    arr[j] = arr[j - gap];
                    swaps++;
                    j -= gap;
                }
                arr[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        console.log(`Shell Sort - К-сть порівнянь: ${comparisons} \nК-сть переміщень: ${swaps}`);
    },
    
    quickSort(arr, ascending = true) {
        const stats = { comparisons: 0, swaps: 0 };
    
        let definedValues = arr.filter(el => el !== undefined);
        let undefinedCount = arr.length - definedValues.length;
    
        this.quickSortHelper(definedValues, ascending, 0, definedValues.length - 1, stats);
    
        arr.length = 0;
        arr.push(...Array(undefinedCount).fill(undefined), ...definedValues);
    
        console.log(`Quick Sort - К-сть порівнянь: ${stats.comparisons} \nК-сть переміщень: ${stats.swaps}`);
    },
    
    quickSortHelper(arr, ascending, left, right, stats) {
        if (left >= right) return;
    
        let pivotIndex = Math.floor((left + right) / 2);
        let pivot = arr[pivotIndex];
    
        let index = this.partition(arr, left, right, pivot, ascending, stats);
        this.quickSortHelper(arr, ascending, left, index - 1, stats);
        this.quickSortHelper(arr, ascending, index, right, stats);
    },
    
    partition(arr, left, right, pivot, ascending, stats) {
        while (left <= right) {
            while (this.compare(arr[left], pivot, ascending) < 0) {
                left++;
                stats.comparisons++;
            }
            while (this.compare(arr[right], pivot, ascending) > 0) {
                right--;
                stats.comparisons++;
            }
            if (left <= right) {
                if (left !== right) {
                    this.swap(arr, left, right);
                    stats.swaps++;
                }
                left++;
                right--;
            }
        }
        return left;
    }
    
};

